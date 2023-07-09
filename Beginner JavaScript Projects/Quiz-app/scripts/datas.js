export const datas = JSON.parse(localStorage.getItem('datas')) ??
{
  users: [
    {
      id: 1,
      username: 'Mobin',
      email: 'm.a.official.page@gmail.com',
      password: 'M1234',
      startedQuizzesIDs: []
    }
  ],
  quizzes: [
    {
      id: 1,
      title: 'English quiz for beginners',
      quizContent: [
        {
          question: `What's the first english letter?`,
          a: 'b',
          b: 'z',
          c: 'f',
          d: 'a',
          correct: 'd'
        },
        {
          question: `You _____ drink and drive.`,
          a: 'may',
          b: 'must',
          c: 'must not',
          d: 'may not',
          correct: 'c'
        },
      ],
      imageColor: 'blue',
      image: 'tag',
    },
    {
      id: 2,
      title: 'Beginner Javascript questions',
      quizContent: [
        {
          question: `What is the output of the following code: console.log(typeof null);`,
          a: "object",
          b: "null",
          c: "undefined",
          d: "string",
          correct: 'a'
        },
        {
          question: `What will be the result of the following code?
          console.log(2 + '2');`,
          a: 4,
          b: `"22"`,
          c: `"4"`,
          d: "NaN",
          correct: "b"
        },
      ],
      imageColor: 'orange',
      image: 'waves',
    },
    {
      id: 3,
      title: 'Intermediate English questions',
      quizContent: [
        {
          question: `It is not ____ mine.`,
          a: 'same as',
          b: 'same like',
          c: 'the same as',
          d: 'the same like',
          correct: 'c'
        },
        {
          question: `What is the correct spelling?`,
          a: 'necesary',
          b: 'neccesary',
          c: 'necessary',
          d: 'neccessary',
          correct: 'c'
        },
      ],
      imageColor: 'purple',
      image: 'air',
    },
    {
      id: 4,
      title: 'General English questions',
      quizContent: [
        {
          "question": "Who wrote the play \"Romeo and Juliet\"?",
          "a": "William Shakespeare",
          "b": "Mark Twain",
          "c": "J.K. Rowling",
          "d": "Jane Austen",
          "correct": "a"
        },
        {
          "question": "What is the opposite of the word \"brave\"?",
          "a": "Bold",
          "b": "Fearless",
          "c": "Cowardly",
          "d": "Courageous",
          "correct": "c"
        },
        {
          "question": "Which verb correctly completes this sentence: \"She ________ the book on the table\"?",
          "a": "Put",
          "b": "Puts",
          "c": "Putting",
          "d": "Putted",
          "correct": "a"
        },
        {
          "question": "What is the plural form of the word \"child\"?",
          "a": "Childs",
          "b": "Childrens",
          "c": "Childes",
          "d": "Children",
          "correct": "d"
        },
        {
          "question": "What do you call a word that has the opposite meaning of another word?",
          "a": "Synonym",
          "b": "Antonym",
          "c": "Homonym",
          "d": "Acronym",
          "correct": "b"
        },
        {
          "question": "Which of the following is an example of a pronoun?",
          "a": "Run",
          "b": "Table",
          "c": "He",
          "d": "Large",
          "correct": "c"
        },
        {
          "question": "What is the correct spelling of the color between yellow and blue?",
          "a": "Green",
          "b": "Blew",
          "c": "Gruen",
          "d": "Grene",
          "correct": "a"
        },
        {
          "question": "Which word is a noun in the sentence: \"The cat chased the mouse\"?",
          "a": "Chased",
          "b": "The",
          "c": "Cat",
          "d": "Mouse",
          "correct": "c"
        },
        {
          "question": "What is the past tense of the verb \"begin\"?",
          "a": "Begins",
          "b": "Beginned",
          "c": "Began",
          "d": "Begun",
          "correct": "c"
        },
        {
          "question": "What is the adverb form of the word \"quick\"?",
          "a": "Quickly",
          "b": "Quickness",
          "c": "Quicker",
          "d": "Quickest",
          "correct": "a"
        }
      ],
      imageColor: 'green',
      image: 'bolt',
    },
  ]
};
