import { updateLS } from "./datas.js";

export const toggleBookmark = () => {
  const localStorageKey = 'is.bookmarked';

  const bookmarkBtn = document.querySelector('[data-bookmarkBtn]');
  const bookmarkBtnText = bookmarkBtn.querySelector('p');
  
  let isBookmarked = JSON.parse(localStorage.getItem(localStorageKey)) ?? false;

  const changeUIState = () => {
    if (isBookmarked) {
      bookmarkBtnText.textContent = 'bookmarked' 
      bookmarkBtn.classList.add('bookmarked');
    } else {
      bookmarkBtnText.textContent = 'bookmark';
      bookmarkBtn.classList.remove('bookmarked');
    }
  }
  changeUIState();

  bookmarkBtn.addEventListener('click', () => {
    isBookmarked = !isBookmarked;
    changeUIState();
    updateLS(localStorageKey, isBookmarked);
  });
}

toggleBookmark()