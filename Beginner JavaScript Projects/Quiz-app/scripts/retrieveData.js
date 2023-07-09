import { datas } from "./datas.js";

let userId = 1; 
/* func */

export const getQuizzes = (sortBy) => {
  let quizzes = [];
  const startedQuizzesIDs = datas.users.find(user => user.id === userId).startedQuizzesIDs;
  sortBy === 'opened' ? getUserOpenedQuizzes(userId) : ''
  sortBy === 'new' ? getNewQuizzes(userId) : ''

  function getUserOpenedQuizzes(userId) {
    quizzes = datas.quizzes.filter(quiz => startedQuizzesIDs.includes(quiz.id));
  }

  function getNewQuizzes(userId) {
    quizzes = datas.quizzes.filter(quiz => !startedQuizzesIDs.includes(quiz.id));
  }

  return quizzes;
}

export const getQuiz = (id) => {
  const quiz = datas.quizzes.find(quiz => quiz.id === id);

  return quiz;
}

export const addQuizToOpened = (id) => {
  const user = datas.users.find(user => user.id === userId);
  user.startedQuizzesIDs.length === 0 
  ? 
  user.startedQuizzesIDs.push(id) 
  :
  user.startedQuizzesIDs.forEach(startedQuiz => {
    startedQuiz !== id ? user.startedQuizzesIDs.push(id) : ''
  });

  saveToLocalStorage('datas', datas);
}

const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
}