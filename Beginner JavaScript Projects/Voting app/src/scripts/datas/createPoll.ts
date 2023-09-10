import { LSKey_PollsArr, Poll, polls } from "./datas";
import { pushToLocalStorage } from "./localStorage";

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

  const pollId = polls[polls.length - 1]?.id + 1 ?? 1;

  const pollObj: Poll = {
    id: pollId,
    title: title,
    pollCategories: [],
    ownerId: ownerId,
    pollChoices: [],
    creationDate: new Date().toISOString(),
    closed: false,
    openUntil: openUntil,
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

  polls.push(pollObj);

  pushToLocalStorage(LSKey_PollsArr, polls);

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