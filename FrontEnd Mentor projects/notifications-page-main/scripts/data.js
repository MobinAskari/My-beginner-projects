export const notifications = [
  {
    id: 1,
    profileImage: 'assets/images/avatar-mark-webber.webp',
    name: 'Mark Webber',
    action: {
      notification: 'reacted to your recent post',
      to: 'My first tournament today!',
      content: '',
      postPicture: null
    },
    new: true,
    timestamp: '1m ago',
  },
  {
    id: 2,
    profileImage: 'assets/images/avatar-angela-gray.webp',
    name: 'Angela Gray',
    action: {
      notification: 'followed you',
      to: '',
      content: '',
      postPicture: null
    },
    new: true,
    timestamp: '5m ago',
  },
  {
    id: 3,
    profileImage: 'assets/images/avatar-jacob-thompson.webp',
    name: 'Jacob Thompson',
    action: {
      notification: 'has joined your group',
      to: 'Chess Club',
      content: '',
      postPicture: null
    },
    new: true,
    timestamp: '5m ago',
  },
  {
    id: 4,
    profileImage: 'assets/images/avatar-rizky-hasanuddin.webp',
    name: 'Rizky Hasanuddin',
    action: {
      notification: 'sent you a private message',
      to: '',
      content: `Hello, thanks for setting up the Chess Club. I've been a member for a few weeks now and I'm already having lots of fun and improving my game.`,
      postPicture: null
    },
    new: false,
    timestamp: '5 days ago',
  },
  {
    id: 5,
    profileImage: 'assets/images/avatar-kimberly-smith.webp',
    name: 'Kimberly Smith',
    action: {
      notification: 'commented on your picture',
      to: '',
      content: ``,
      postPicture: 'assets/images/image-chess.webp'
    },
    new: false,
    timestamp: '1 week ago',
  },
  {
    id: 6,
    profileImage: 'assets/images/avatar-nathan-peterson.webp',
    name: 'Nathan Peterson',
    action: {
      notification: 'reacted to your recent post',
      to: '5 end-game strategies to increase your win rate',
      content: '',
      postPicture: null
    },
    new: false,
    timestamp: '1m ago',
  },
  {
    id: 7,
    profileImage: 'assets/images/avatar-anna-kim.webp',
    name: 'Anna Kim',
    action: {
      notification: 'left the group',
      to: 'Chess Club',
      content: '',
      postPicture: null
    },
    new: false,
    timestamp: '2 weeks ago',
  }
]

/* 
 Private message: notification-contents_container
 Picture: notification-contents_container_header -> reacted-post-picture_wrapper
*/