import { datas, updateLS, signout } from "./datas.js";
import { onboarding } from "./modals.js";
import { siginUser, signupUser, addFolder } from "./datas.js";

export const mainContainer = document.querySelector('.main-container');

export function folders() {
  mainContainer.innerHTML = ``;

  const foldersSection = document.createElement('section');
  foldersSection.classList = 'folders';

  foldersSection.innerHTML = `
    <div class="folders__header">
      <h1>Folders</h1>
      <button>
        <span class="material-symbols-rounded">calendar_month</span>
      </button>
    </div>
    <div class="folders__body">
      
    </div>
    <button class="primary__add-btn folderBtn open-addMenu-btn">
      <span class="material-symbols-rounded">add</span>
    </button>
    <button class="primary__add-btn signoutBtn signout-btn">
      <span class="material-symbols-rounded">Logout</span>
    </button>

    <div class="overlay hidden"></div>
    
    <div class="folders__add hidden">
      <p class="alert hidden"></p>
      <label for="folder-name">Folder name</label>
      <input type="text" id="folder-name" placeholder="Folder name...">
      <button class="modal__submit-btn add-folder__btn">Add</button>
    </div>
  `;

  const showFolders = () => {
    const allFolders = { };
  
    const user = datas.users.find(user => user.id === datas.currentUser.id);
  
    user.notes.forEach(note => {
  
      if (allFolders.hasOwnProperty(note.folder)) {
        allFolders[note.folder].push(note)
      } else {
        allFolders[note.folder] = [note]
      }
  
    });
  
    const folderBody = foldersSection.querySelector('.folders__body');
    folderBody.innerHTML = '';
  
    Object.keys(allFolders).forEach(key => {
  
      folderBody.innerHTML += `
        <div class="folder" data-folder="${key}">
        <div class="folder__header">
          <h6>${key}</h6>
          <button><span class="material-symbols-rounded">arrow_forward_ios</span></button>
        </div>
        <div class="folder__footer">
          <div class="folder__counter">
            ${allFolders[key].length}
          </div>
        </div>
        </div>
      `;
    });
  
    foldersSection.querySelectorAll('.folder').forEach(folder => {
      folder.addEventListener('click', () => {
        notes(folder.dataset.folder);
      });
    });
  }
  
  const handleAddingAFolder = () => {
    const openAddmenuButton = foldersSection.querySelector('.open-addMenu-btn');
    
    const overlay = foldersSection.querySelector('.overlay');
    const folders__add = foldersSection.querySelector('.folders__add');
  
    openAddmenuButton.addEventListener('click', () => {
      overlay.classList.toggle('hidden');
      folders__add.classList.toggle('hidden');
    });

    overlay.addEventListener('click', () => {
      overlay.classList.toggle('hidden');
      folders__add.classList.toggle('hidden');
    });
  
    const alertElement = foldersSection.querySelector('.alert');
    const folderNameInput = foldersSection.querySelector('#folder-name');
    const addFolderSubmitBtn = foldersSection.querySelector('.add-folder__btn');
  
    addFolderSubmitBtn.addEventListener('click', () => {
      const isOkay = addFolder(folderNameInput.value);
      alertElement.classList.remove("hidden");
      alertElement.textContent = isOkay.text;
  
      if (!isOkay.states) {
        alertElement.style.color = '#CC4F4F';
      } else {
        alertElement.style.color = 'green';
        folderNameInput.value = '';
        showFolders();
      }
    });
  }

  const handleSignout = () => {
    const signoutBtn = foldersSection.querySelector('.signout-btn');
    signoutBtn.addEventListener('click', () => {
      signout();
    });
  }

  showFolders();
  handleAddingAFolder();
  handleSignout();

  mainContainer.append(foldersSection);
}

export function notes(subFolder) {
  mainContainer.innerHTML = ``;

  const notesSection = document.createElement('section');
  notesSection.classList = 'notes';

  notesSection.innerHTML = `
    <div class="notes__header">
      <button class="back-button">
      <span class="material-symbols-rounded">keyboard_backspace</span>
      </button>
      <h1>${subFolder} notes</h1>
      <div class="notes_filter">
      
      </div>      
    </div>
    <div class="notes__body">
    
    </div>
  `;

  const backButton = notesSection.querySelector('.back-button');
  backButton.addEventListener('click', () => folders());
  
  const user = datas.users.find(user => user.id === datas.currentUser.id);
  const filteredByFolder = user.notes.filter(data => data.folder === subFolder);
  
  const showFilters = () => {
    const sortCon = notesSection.querySelector('.notes_filter');
    
    const categories = filteredByFolder.map(filtered => filtered.category);
  
    sortCon.innerHTML += `
      <button class="notes_filter-btn">
        <span class="material-symbols-rounded">page_info</span>
        <p>filters</p>
      </button>
    `;
    categories.forEach(category => {
      sortCon.innerHTML += `
         <button class="notes_filter-btn">
          <p>${category}</p>
        </button>
      `;
    });

  }

  const showAndOpenNote = () => {
    filteredByFolder.forEach(filteredNote => {
      notesSection.querySelector('.notes__body').innerHTML += `
        <div class="note" data-note="${filteredNote.id}">
          ${marked(filteredNote.text)}
        </div>
      `;
    });
  
    notesSection.querySelectorAll('.note').forEach(note => {
      note.addEventListener('click', e => {
        e.preventDefault();
        notePage(parseFloat(note.dataset.note));
      });
    });
  }

  showFilters();
  showAndOpenNote();

  mainContainer.append(notesSection)
      
}

export function notePage(noteId) {
  mainContainer.innerHTML = ``;

  const user = datas.users.find(user => user.id === datas.currentUser.id);
  const note = user.notes.find(data => data.id === noteId);

  const notePageSection = document.createElement('section');
  notePageSection.classList = 'note-page';  

  notePageSection.innerHTML = `
    <div class="note-page__header">
    <button class="back-button">
      <span class="material-symbols-rounded">keyboard_backspace</span>
    </button>
    <button class="">
      <span class="material-symbols-rounded">send</span>
    </button>
    <button class="">
      <span class="material-symbols-rounded">list</span>
    </button>
    </div>
    <div class="note-page__metadata">
      <span>${note.category}</span> 
      &bull; 
      <span>${note.date}</span> 
    </div>

    <div class="text-div"></div>
    <textarea class="text-textArea hidden" placeholder="type" name="" id="" cols="30" rows="10" aria-multiline="true"></textarea>

    <button class="modal__submit-btn note-action">Edit</button>
  `;

  const backButton = notePageSection.querySelector('.back-button');
  backButton.addEventListener('click', () => notes(note.folder));

  const noteActionBtn = notePageSection.querySelector('.note-action');

  const textDiv = notePageSection.querySelector('.text-div');
  const textArea = notePageSection.querySelector('.text-textArea');
  textArea.value = note.text;
  textDiv.innerHTML = marked(note.text);
  
  const toggleState = () => {
    if (textArea.classList.contains('hidden')) noteActionBtn.textContent = 'Save';
    
    if (textDiv.classList.contains('hidden')) { 
      noteActionBtn.textContent = 'Edit';
      note.text = textArea.value;
      textDiv.innerHTML = marked(note.text);
      updateLS('userDatas', datas.users);
    }     
    
    textArea.classList.toggle('hidden');
    textDiv.classList.toggle('hidden');
  }

  noteActionBtn.addEventListener('click', toggleState)
  
  mainContainer.append(notePageSection);

}

export const modals = {
  PP: () => {
    const modalCon = document.createElement('div');
    modalCon.classList = 'modal';
    modalCon.innerHTML = `
      <div class="modal__image-wrapper">
        <img src="images/modal/Safe-amico.png" alt="">
      </div>
      <div class="modal__image-text">
        <p>Thank you for choosing our Notes app. By using our services, you are agreeing to our <a href="#">Privacy</a> & <a href="#">Policy</a> terms.</p>
      </div>
      <div class="action">
        <button class="modal__submit-btn agree">
          Agree & continue
        </button>
      </div>
    `;
    modalCon.querySelector('.agree').addEventListener('click', () => {
      onboarding('signin')
    });
    return modalCon;
  },
  signin: () => {
    const modalCon = document.createElement('div');
    modalCon.classList = 'modal';
    modalCon.innerHTML = `
      <div class="modal__image-wrapper">
        <img src="images/modal/Secure login-rafiki.svg" alt="">
      </div>
      <div class="modal__image-text">
        <p>Please log in to your existing account or sign up to create a new account.</p>
      </div>
      <div class="action">
        
        <div class="action__signin entering">
            <label for="signin_email">Username or Email</label>
            <input type="text" id="signin_email" placeholder="Username or Email">
            <label for="signin_password">Password</label>
            <input type="password" id="signin_password" placeholder="Password">
            <div>
              <input type="checkbox" value="lsRememberMe" id="rememberMe"> <label for="rememberMe">Remember me</label>
            </div>
            <p class="hidden alert">Invalid username or password</p>
            <p>Don't have an account yet? <a href="#" id="show-signup">Sign up</a></p>
            <button class="modal__submit-btn signin">Sign in</button>
        </div>
        
      </div>
    `;
    modalCon.querySelector('#show-signup').addEventListener('click', () => {
      onboarding('signup')
    });


    const userInput = modalCon.querySelector('#signin_email');
    const passwordInput = modalCon.querySelector('#signin_password');
    const signinButton = modalCon.querySelector('.signin');

    signinButton.addEventListener('click', () => {
      const alertElement = modalCon.querySelector('.alert');
      const isSignedIn = siginUser(userInput.value, passwordInput.value);

      alertElement.classList.remove('hidden');
      alertElement.textContent = isSignedIn.text;
      if (isSignedIn.status) {
        alertElement.style.color = 'green';
        setTimeout(folders, 1000);
      } else {
        alertElement.style.color = 'red';
      }
    });

    
    return modalCon;
  },
  signup: () => {
    const modalCon = document.createElement('div');
    modalCon.classList = 'modal';
    modalCon.innerHTML = `
      <div class="modal__image-wrapper">
        <img src="images/modal/Secure login-rafiki.svg" alt="">
      </div>
      <div class="modal__image-text">
        <p>Please log in to your existing account or sign up to create a new account.</p>
      </div>
      <div class="action">
        
        <div class="action__signup entering">
          
            <label for="signup_email">Username or Email</label>
            <input type="text" id="signup_email" placeholder="Username or Email">
            <label for="signup_password">Password</label>
            <input type="password" id="signup_password" placeholder="Password">
            <label for="signup_password-reenter">Reenter password</label>
            <input type="password" id="signup_password-reenter" placeholder="Password">
            <p class="hidden alert" style="color: red;">Invalid username or password</p>
            <p>Already have an account? <a href="#" id="show-signin">Sign in</a></p>
            <button class="modal__submit-btn signup">Sign up</button>
          
        </div>
        
      </div>
    `;
    modalCon.querySelector('#show-signin').addEventListener('click', () => {
      onboarding('signin')
    });

    
    const signupListener = () => {
      const userInput = modalCon.querySelector('#signup_email');
      const passwordInput = modalCon.querySelector('#signup_password');
      const passwordReenterInput = modalCon.querySelector('#signup_password-reenter');
      const signupButton = modalCon.querySelector('.signup');

      signupButton.addEventListener('click', () => {
        const alertElement = modalCon.querySelector('.alert');

        const isSignedUp = signupUser(userInput.value, passwordInput.value, passwordReenterInput.value);

        alertElement.classList.remove('hidden');
        alertElement.textContent = isSignedUp.text;
        if (isSignedUp.status) {
          alertElement.style.color = 'green';
          setTimeout(folders, 1000);
        } else {
          alertElement.style.color = 'red';
        }

      });
    }
    signupListener()
    
    return modalCon;
  }
}
