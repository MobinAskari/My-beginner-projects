import { prebuiltCards } from "./components.js";
import { commentData, handleReq } from "./datas.js";

const mainContainer = document.querySelector('.main-container');

commentData.comments.forEach(comment => {
  const card = prebuiltCards('commentCard')(comment);
  mainContainer.append(card)

  const commentRepliesContainer = document.createElement('div');
  commentRepliesContainer.classList = 'comment-replies_container';
  card.appendChild(commentRepliesContainer)

  comment.replies.forEach(reply => {
    commentRepliesContainer.append(prebuiltCards('replyCard')(reply))
  });
})
mainContainer.append(prebuiltCards('addCommentCard')(commentData.currentUser))


const showComments = () => {
  
  commentData.comments.forEach((comment, i) => {

    commentParentContainer.innerHTML += feedbackComponent(commentData.comments[i])
    
    if (comment.replies.length > 0) {
      const commentRepliesContainer = document.createElement('div')
      commentRepliesContainer.classList = `comment-replies_container`;
      commentParentContainer.appendChild(commentRepliesContainer)

      comment.replies.forEach(reply => {
        commentRepliesContainer.innerHTML += commentCardCon(reply)
      });
    }

    mainContainer.appendChild(commentParentContainer);
  
  });
  
}

const showCRUDCon = () => {
  const commentParentContainer = document.createElement('div');
  commentParentContainer.classList = `comment-parent_container`;

  commentParentContainer.innerHTML += CRUDCommentCard();

  mainContainer.appendChild(commentParentContainer);
}

const buttonsFunctionaity = () => {
  const deleteButtons = document.querySelectorAll('.delete-button');
  const editButtons = document.querySelectorAll('.edit-button');

  deleteButtons.forEach(deleteButton => {
    deleteButton.addEventListener('click', () => {
      handleReq('del', parseFloat(deleteButton.dataset.commentId))
    });
  });

  editButtons.forEach(editButton => {
    editButton.addEventListener('click', () => {
      
      // handleReq('edit', parseFloat(editButton.dataset.commentId))
    });
  });
}

export function callALl () {
  mainContainer.innerHTML = ``;

  showComments()
  showCRUDCon()
  buttonsFunctionaity()
}

// callALl()