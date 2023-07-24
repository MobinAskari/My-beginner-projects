import { states } from "./state.js";
import { onboarding } from "./modals.js";

/* 
{
  id: 1,
  user_identifier: 'test',
  password: '123456',
  token: 'e9dONuXwL1RC3iRWpGfWd3BbHneBWNJW',
  notes: [
    {
      id: 1,
      date: '2023/06/06',
      folder: 'default',
      category: 'personal',
      text: `# h1`,
    },
    {
      id: 2,
      date: '2023/06/06',
      folder: 'hello',
      category: 'personal',
      text: `## h2`,          
    }
  ]
}
*/

export const datas = {
  currentUser: JSON.parse(sessionStorage.getItem('currentUser')) ?? { },
  users: JSON.parse(localStorage.getItem('userDatas')) ?? [ {
    id: 1,
    user_identifier: 'test',
    password: '1',
    token: 'e9dONuXwL1RC3iRWpGfWd3BbHneBWNJW',
    notes: [
      {
        id: 1,
        date: '2023/06/06',
        folder: 'default',
        category: 'personal',
        text: 
        `### h3`,
      },
      {
        id: 2,
        date: '2023/06/06',
        folder: 'test',
        category: 'personal',
        text: `-li`,          
      },
      {
        id: 3,
        date: '2023/06/06',
        folder: 'test',
        category: 'smth',
        text: 
        `
          -li
          -li
        `,          
      }
    ]
  } ],
}

const tokenGenerator = () => {
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  let token = '';

  for (let i = 0; i < 32; i++) {
    token += letters[Math.floor(Math.random() * letters.length)];
  }

  return token;
}

export const siginUser = (userInput, pass) => { 
  const isEmpty = isValEmpty(userInput, pass);
  if (isEmpty) return isEmpty;

  datas.users.some(user => {
    if (user.user_identifier === userInput && user.password === pass) {
      datas.currentUser = { id: user.id }
    }
  });

  if (datas.currentUser.id) {
    states.isLogined = true;
    updateSS('states', states);
    updateSS('currentUser', datas.currentUser)
    return { status: true, text: "Welcome back !" };
  } else {
    return { status: false, text: "Invalid Username/Email or Password" };
  }

}

export const signupUser = (userInput, pass, passReEnter) => {
  const isEmpty = isValEmpty(userInput, pass, passReEnter);
  if (isEmpty) return isEmpty;

  if (pass !== passReEnter) return { status: false, text: "Passwords don't match" };
  
  const isTaken = datas.users.some(user => user.user_identifier === userInput);
  if (isTaken) return { status: false, text: "This identifier has already been taken" };

  let id;

  datas.users.length !== 0 
  ? id = (datas.users[datas.users.length - 1].id + 1) 
  : id = 1

  datas.users.push( {
    id,
    user_identifier: userInput,
    password: pass,
    token: tokenGenerator(),
    notes: [
    ]
  } )

  datas.currentUser = datas.users.find(user => user.id === id);
  
  states.isLogined = true;
  updateSS('states', states);
  updateLS('userDatas', datas.users)
  updateSS('currentUser', datas.currentUser)

  return { status: true, text: "Your account has been successfully created !" };
  
}

export const addFolder = (folderName) => {
  const isEmpty = isValEmpty(folderName);
  if (isEmpty) return isEmpty;

  const user = datas.users.find(user => user.id === datas.currentUser.id);

  const isDuplicate = user.notes.some(note => note.folder === folderName)
  if (isDuplicate) return { states: false, text: 'Folder names cannot be identical' };

  let id;

  user.notes.length !== 0 
  ? id = (user.notes[user.notes.length - 1].id + 1) 
  : id = 1

  user.notes.push( {
    id,
    date: '',
    folder: folderName,
    category: 'dafualt',
    text: ``,          
  } );

  updateLS('userDatas', datas.users);

  return { states: true, text: 'Folder has been successfully created' };
}

export const updateLS = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}

export const signout = () => {
  datas.currentUser = { };
  states.isLogined = false;
  updateSS('states', states);
  updateSS('currentUser', datas.currentUser);
  onboarding('signin')
}

const updateSS = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
}

function isValEmpty(...vals) {
  const isEmpty = vals.some(val => val.length === 0);

  if (isEmpty) return { states: false, text: `Input cannot be empty` };

  const includesWhiteSpace = vals[0][0] === ' ' || [...vals[0]].some(char => char === ' ');

  if (includesWhiteSpace) return { states: false, text: 'Folder name cannot start, include or end with whitespace characters' };
}
