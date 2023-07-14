import { notifications } from "./data.js";
import { generateNotificationCard } from "./components.js";

const allNotificationsContainer = document.querySelector('.all-notifications_container');

const notificationsCounter = document.querySelector('.notifications-counter');

const markAsReadButton = document.querySelector('.mark-as-read_wrapper').querySelector('button');

function showNotifications () {
  allNotificationsContainer.innerHTML = ``;

  let newNotifications = 0;

  const sortedNotifications = notifications.reduce((acc, cur) => {
    if (cur.new) {
      acc.new.push(cur);
      newNotifications += 1;
    } else {
      acc.seen.push(cur);
    }
    return acc;
  }, {new: [], seen: []})

  Object.keys(sortedNotifications).forEach(key => {
    sortedNotifications[key].forEach(notification => {
      allNotificationsContainer.innerHTML += generateNotificationCard(notification);
    });
  });

  notificationsCounter.textContent = newNotifications;
  
  trackActions()
}

function trackActions() {
  markAsReadButton.addEventListener('click', () => {
    notifications.forEach(notification => notification.new = false);
    showNotifications()
  });

  const notificationCardContainers = document.querySelectorAll('.notification-card_container');
  notificationCardContainers.forEach((notificationCard, i) => {
    notificationCard.addEventListener('click', () => {
      notificationCard.classList.remove('new');
      
      notifications
      .find(notification => notification.id === parseFloat(notificationCard.dataset.notificationId))
      .new = false;

      showNotifications()
    });
  });
}

showNotifications()
