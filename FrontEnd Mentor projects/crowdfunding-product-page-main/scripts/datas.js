export const localStorageKey = 'allDatas';

export const datas = JSON.parse(localStorage.getItem(localStorageKey)) ?? {
  insights: {
    moneyRaised: 89914,
    goal: 100000,
    totalBackers: 5007,
    daysLeft: 56
  },
  plans: [
    {
      id: 1,
      title: 'Pledge with no reward',
      requirement: null,
      description: "Choose to support us without a reward if you simply believe in our project. As a backer, you will be signed up to receive product updates via email.",
      quantity: null,
    },
    {
      id: 2,
      title: 'Bamboo Stand',
      requirement: 25,
      description: "You get an ergonomic stand made of natural bamboo. You've helped us launch our promotional campaign, and you’ll be added to a special Backer member list.",
      quantity: 101,
    },
    {
      id: 3,
      title: 'Black Edition Stand',
      requirement: 75,
      description: "You get a Black Special Edition computer stand and a personal thank you. You’ll be added to our Backer member list. Shipping is included.",
      quantity: 64,
    },
    {
      id: 4,
      title: 'Mahogany Special Edition',
      requirement: 200,
      description: "You get two Special Edition Mahogany stands, a Backer T-Shirt, and a personal thank you. You’ll be added to our Backer member list. Shipping is included.",
      quantity: 0,
    },
  ]
}

export const updateLS = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
}

