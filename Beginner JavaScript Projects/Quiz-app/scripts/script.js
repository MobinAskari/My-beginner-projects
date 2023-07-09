import { 
  addSidebar, 
  addHeaderItems, 
  addMainContainerSections, 
  headerContainer, 
  mainContainer,
} from "./components.js";

export const showHomepage = () => {
  headerContainer.innerHTML = ``;
  mainContainer.innerHTML = ``;
  
  addSidebar('leftsidebar-container', 'Home', 'Quizes', 'Leaderboard', 'Account');
  
  addHeaderItems('search', 'accountInfo');

  addMainContainerSections('new', 'opened');
}

showHomepage()
