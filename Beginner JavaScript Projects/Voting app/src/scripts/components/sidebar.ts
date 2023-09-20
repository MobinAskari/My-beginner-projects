import { showAddPollPage } from "./createPollPage.ts";
import { showHomePage } from "./homepage.ts";

export const addSidebar = () => {
  const body = document.body;
  let sidebar = document.querySelector('sidebar') as HTMLElement;

  if (!sidebar) {
    sidebar = document.createElement('aside');
    sidebar.classList.add('sidebar');

    sidebar.innerHTML = `
      <nav>
        <ul>
          <li class="sidebarItem" data-route-name="mainpage">
            <svg width="1.75rem" height="1.75rem">
              <use href="/icons.svg#icon_home">
            </svg>
            <p>Home</p>
          </li>
          <li class="sidebarItem">
            <svg width="1.75rem" height="1.75rem">
              <use href="/icons.svg#icon_categories">
            </svg>
            <p>Categories</p>
          </li>
          <li>
            <button class="sidebar-add-btn sidebarItem" data-route-name="addPollPage">
              <svg width="1.5rem" height="1.5rem">
                <use href="/icons.svg#icon_add">
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    `;

    body.appendChild(sidebar);
  }

  const routes: any = {
    mainpage: () => showHomePage(),
    addPollPage: () => showAddPollPage()
  }

  const sidebarItems = [...document.querySelectorAll('.sidebarItem')] as HTMLDivElement[];

  sidebarItems.forEach(item => {
    item.addEventListener('click', () => {
      const route = item.dataset.routeName as string;
      if (routes[route] != null) {
        routes[route]()
      }
    });
  });
}