/*
import { LSKey_PollsArr, SSKey_CurrentUser, type Poll, polls, users, LSKey_UsersArr } from "./datas";
import { pullSessionStorage } from "./sessionStorage";
import { pushToLocalStorage } from "./localStorage";
import { showLoginPage } from "../components/loginpage";
import { } from "./datas";
// export class PollObject {
//   constructor(
//     public id: number,
//     public title: string,
//     public pollCategories: pollCategory[],
//     public ownerId: number,
//     public pollChoices: pollChoice[],
//     public creationDate: string,
//     public openUntil: string | null,
//     public closed: boolean
//   ) {
//     this.pollChoices = []
//   }
// }

export const createAndAddPollObject = (
  title: string,
  pollCategories: string[],
  ownerId: number,
  pollChoices: string[],
  openUntil: string | null,
) => {

  const getRandomColor = () => {
    const colors = [
      '--blue700',
      '--rose700',
      '--rose800',
      '--green800',
      '--violet600',
      '--orange600',
    ];

    return colors[Math.floor(Math.random() * colors.length)];
  }

  const user = (() => {
    let userId: number;

    const pullResult = pullSessionStorage(SSKey_CurrentUser);

    if (pullResult.status === 200) {
      userId = pullResult.data.id;
    }

    return users.find(user => user.id === userId);
  })();

  if (!user) {
    alert("You're not authorized");
    showLoginPage();
    return;
  }

  const generatedPollId = polls[polls.length - 1]?.id + 1 ?? 1;

  const pollObj: Poll = {
    id: generatedPollId,
    title: title,
    poll_categories: [],
    owner_id: String(ownerId),
    poll_choices: [],
    closed: false,
    closing_date: openUntil,
  };

  pollCategories.forEach(category => {
    pollObj.pollCategories.push({
      name: category,
      color: getRandomColor()
    });
  });

  pollChoices.forEach((choice, i) => {
    pollObj.pollChoices.push({
      id: i + 1,
      name: choice,
      choosedBy: []
    });
  });

  user.createdPollsIds.push(generatedPollId);

  polls.push(pollObj);
  pushToLocalStorage(LSKey_PollsArr, polls);
  pushToLocalStorage(LSKey_UsersArr, users);

  return true;

  // creationDate 
  // closed property! 
}

// export const instantiatePollObject = (
//   id: number,
//   title: string,
//   pollCategories: pollCategory[],
//   ownerId: number,
//   pollChoices: pollChoice[],
//   creationDate: string,
//   openUntil: string | null,
//   closed: boolean
// ) => new PollObject(
//   id,
//   title,
//   pollCategories,
//   ownerId,
//   pollChoices,
//   creationDate,
//   openUntil,
//   closed,
// )
*/