export const generateNotificationCard = (notification) => {
  return `
    <div class="notification-card_container ${notification.new ? ' new' : ''}" data-notification-id="${notification.id}">
      <div class="profile-picture_wrapper">
        <img src="${notification.profileImage}" alt="">
      </div>
      <div class="notification-contents_container">
        <div class="notification-contents_container_header">
          <div class="notification-contents-metadata_container">
            <div class="name-action-state_container">
              <strong>${notification.name}</strong>
              <p>${notification.action.notification}</p>
              ${notification.action.to ? `<strong>${notification.action.to}</strong>` : ''}
              ${notification.new ? `<span class="new-notification state"></span>` : ''}
            </div>
            <div class="timestamp_wrapper">
              <p>${notification.timestamp}</p>
            </div>
          </div>
          <div class="reacted-post-picture_wrapper">
            ${notification.action.postPicture ? `<img src="${notification.action.postPicture}" alt="">` : ''}
          </div>
        </div>
        
        ${notification.action.content ? `
        <div class="private-message_wrapper">
          <p>${notification.action.content}</p>
        </div>` : ''}
        
      </div>
    </div>
  `;
}