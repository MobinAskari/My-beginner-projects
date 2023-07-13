import { commentData } from './datas.js';

export const commentParentAndCardContainer = () => {
  const commentParentContainer = document.createElement('div');
  commentParentContainer.classList = `comment-parent_container`;

  const commentCardContainer = document.createElement('div');
  commentCardContainer.classList = `comment-card_container`;
  
  commentParentContainer.appendChild(commentCardContainer);
  return commentParentContainer;
}

export const feedbackComponent = (score) => {
  const feedbackCotainerElement = document.createElement('div');
  feedbackCotainerElement.classList = 'feedback_container';
  feedbackCotainerElement.innerHTML = 
  `
    <button class="positive-feedback-button">
      <img src="images/icon-plus.svg" alt="">
    </button>
    <h5 class="feedback-score">${score}</h5>
    <button class="negative-feedback-button">
      <img src="images/icon-minus.svg" alt="">
    </button>
  `;
  return feedbackCotainerElement;
}

export const textWrapperComponents = (functionality) => {
  const functionalities = {
    commentText: (text) => {
      const pElement = document.createElement('p');
      pElement.textContent = text;
      return pElement;
    },
    textArea: () => {
      const textAreaElement = document.createElement('textarea');
      textAreaElement.classList = 'comment-textarea';
      textAreaElement.placeholder = 'Add a comment...';
      return textAreaElement;
    }
  }

  return functionalities[functionality];
}

export const metadataComponents = (component) => {
  const components = {            
    profilePicture: (path) => {
      const profilePictureWrapperElement = document.createElement('div');
      profilePictureWrapperElement.classList = 'profile-picture_wrapper';
      const img = document.createElement('img');
      img.src = path;
      profilePictureWrapperElement.appendChild(img);
      return profilePictureWrapperElement;
    },
    profileName: (name) => {
      const profileNameWrapperElement = document.createElement('div');
      profileNameWrapperElement.classList = 'profile-name_wrapper'
      const pElement = document.createElement('p');
      pElement.textContent = name;

      profileNameWrapperElement.appendChild(pElement);
      return profileNameWrapperElement;
    },
    profileIndicator: () => {
      const accountIndicatorWrapperElement = document.createElement('div');
      accountIndicatorWrapperElement.classList = 'account-indicator_wrapper';
      const pElement = document.createElement('p');
      pElement.textContent = 'you';

      accountIndicatorWrapperElement.appendChild(pElement);
      return accountIndicatorWrapperElement;
    },
    timestamp: (date) => {
      const commentTimestampWrapperElement = document.createElement('div');
      commentTimestampWrapperElement.classList = 'comment-timestamp_wrapper';
      const pElement = document.createElement('p');
      pElement.textContent = date;

      commentTimestampWrapperElement.appendChild(pElement);
      return commentTimestampWrapperElement;
    },
  }

  return components[component];
}

export const actionsComponents = (action) => {
  const createButton = (id, className, imgSrc, buttonText) => {
    const button = document.createElement('button');
    button.classList = className;
    button.dataset.commentId = id;
    button.innerHTML = `
      <img src="${imgSrc}" alt="">
      <p>${buttonText}</p>
    `;
    return button;
  };
  
  const actions = {
    reply: (id) => {
      return createButton(id, 'reply-button', 'images/icon-reply.svg', 'Reply');
    },
    edit: (id) => {
      return createButton(id, 'edit-button', 'images/icon-Edit.svg', 'Edit');
    },
    delete: (id) => {
      return createButton(id, 'delete-button', 'images/icon-delete.svg', 'Delete');
    },
    send: () => {
      const sendButton = document.createElement('button');
      sendButton.classList = 'send-button';
      sendButton.classList.add('crud-button-style');
      sendButton.innerHTML = 
      `
        <p>SEND</p>
      `;
      return sendButton;
    }
  }

  return actions[action];
}

export const prebuiltCards = (card) => {
  const parent = commentParentAndCardContainer();
  let cardContainer = parent.querySelector('.comment-card_container');

  const commentActionsContainer = document.createElement('div');
  commentActionsContainer.classList = 'comment-actions_container';

  const cards = {
    commentCard: (data) => {      
      cardContainer.appendChild(feedbackComponent(data.score));

      const commentContentsContainer = document.createElement('div');
      commentContentsContainer.classList = 'comment-contents_container';

      cardContainer.appendChild(commentContentsContainer);

      const commentContentsHeaderContainer = document.createElement('div');
      commentContentsHeaderContainer.classList = 'comment-contents-header_container';

      const commentMetadataContainer = document.createElement('div');
      commentMetadataContainer.classList = 'comment-metadata_container';

      commentMetadataContainer.append(
        metadataComponents('profilePicture')(data.user.image.png),
        metadataComponents('profileName')(data.user.username),
        metadataComponents('timestamp')(data.createdAt),
      )

      commentActionsContainer.append(
        actionsComponents('reply')(data.id),
      )

      commentContentsHeaderContainer.append(commentMetadataContainer, commentActionsContainer)

      const commentTextWrapper = document.createElement('div')
      commentTextWrapper.classList = 'comment-text_wrapper';

      const commentText = textWrapperComponents('commentText')(data.content);

      commentTextWrapper.appendChild(commentText)

      commentContentsContainer.append(commentContentsHeaderContainer, commentTextWrapper)

      return parent;
    },
    replyCard: (data) => {   
      cardContainer = document.createElement('div');
      cardContainer.classList = 'comment-card_container';

      cardContainer.appendChild(feedbackComponent(data.score));

      const commentContentsContainer = document.createElement('div');
      commentContentsContainer.classList = 'comment-contents_container';

      cardContainer.appendChild(commentContentsContainer);

      const commentContentsHeaderContainer = document.createElement('div');
      commentContentsHeaderContainer.classList = 'comment-contents-header_container';

      const commentMetadataContainer = document.createElement('div');
      commentMetadataContainer.classList = 'comment-metadata_container';

      commentMetadataContainer.append(
        metadataComponents('profilePicture')(data.user.image.png),
        metadataComponents('profileName')(data.user.username),
        metadataComponents('timestamp')(data.createdAt),
      )

      commentActionsContainer.append(
        actionsComponents('reply')(data.id),
      )

      commentContentsHeaderContainer.append(commentMetadataContainer, commentActionsContainer)

      const commentTextWrapper = document.createElement('div')
      commentTextWrapper.classList = 'comment-text_wrapper';

      const commentText = textWrapperComponents('commentText')(data.content);

      commentTextWrapper.appendChild(commentText)

      commentContentsContainer.append(commentContentsHeaderContainer, commentTextWrapper)

      return cardContainer;
    },
    addCommentCard: (data) => {
      commentActionsContainer.append(actionsComponents('send')())

      cardContainer.append(
        metadataComponents('profilePicture')(data.image.png),
        textWrapperComponents('textArea')(),
        commentActionsContainer
      )

      return parent;
    }
  }

  return cards[card];
}
/*
<div class="comment-contents_container">
        <div class="comment-contents-header_container">
          <div class="comment-metadata_container">
            <div class="profile-picture_wrapper">
              <img src="${data.user.image.png}" alt="">
            </div>
            <div class="profile-name_wrapper">
              <p>${data.user.username}</p>
            </div>
            <div class="account-indicator_wrapper">
              ${data.user.username === commentData.currentUser.username ? '<p>you</p>' : ''}
            </div>
            <div class="comment-timestamp_wrapper">
              <p>${data.createdAt}</p>
            </div>
          </div>
          <div class="comment-actions_container">
          ${
            data.user.username === commentData.currentUser.username 
            ? 
            `
              <button class="delete-button" data-comment-id="${data.id}">
                <img src="images/icon-delete.svg" alt="">
                <p>Delete</p>
              </button>
              <button class="edit-button" data-comment-id="${data.id}">
                <img src="images/icon-Edit.svg" alt="">
                <p>Edit</p>
              </button>
            ` 
            : 
            `
              <button class="reply-button" data-comment-id="${data.id}">
                <img src="images/icon-reply.svg" alt="">
                <p>Reply</p>
              </button>
            `
          }
            
          </div>
        </div>
        <div class="comment-text_wrapper">
          <p>${data.content}</p>
        </div>
      </div>*/