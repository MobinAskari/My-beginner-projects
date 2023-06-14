const menuInfoArray = [
  {
    li: "TEST 1",
    children: true,
    childrenElements: [
      "CHILD 1",
      'CHILD 2',
      'CHILD 3'
    ]
  },
  {
    li: "TEST2"
  }, 
  {
    li: "TEST 3",
    children: true,
    childrenElements: [
      "CHILD 1-3",
      'CHILD 2-3',
      'CHILD 3-3'
    ]
  },
  {
    li: "TEST2"
  },
  {
    li: "GOLD"
  },
  {
    li: "PARTNERS",
    children: true,
    childrenElements: [
      "CHILD PARTNERS-3",
      'CHILD PARTNERS-3',
      'CHILD PARTNERS-3'
    ]
  },
  {
    li: "PRESS"
  },
  {
    li: "PLAYER"
  },
  {
    li: "SHOP",
    children: true,
    childrenElements: [
      "CHILD SHOP-3",
      'CHILD SHOP-3',
      'CHILD SHOP-3'
    ]
  },
  {
    li: "LOST CIVILIZATION"
  },
  {
    li: "TEST",
    children: true,
    childrenElements: [
      "CHILD TEST-6",
      'CHILD TEST-6',
      'CHILD TEST-6'
    ]
  }
];

// 1 ul container

// 1 <LI> for each item

// 1 ul > li*items if <LI> has a list too or in other words if children: true