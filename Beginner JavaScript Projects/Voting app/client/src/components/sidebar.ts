import { showAddPollPage } from "./createPollPage.ts";
import { showHomePage } from "./homepage.ts";

export default async function addSidebar() {
  const body = document.body;
  let sidebar = document.querySelector('.sidebar') as HTMLElement;

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
    const sidebarItems = [...document.querySelectorAll('.sidebarItem')] as HTMLDivElement[];

    sidebarItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        e.stopImmediatePropagation();
        const route = item.dataset.routeName as string;
        if (routes[route] != null) routes[route]();
      });
    });
  }
  sidebar.style.pointerEvents = 'visible';

  const routes: any = {
    mainpage: () => showHomePage(),
    addPollPage: () => showAddPollPage()
  };
  return sidebar;
}

export function removeSidebar() {
  const sidebar = document.querySelector('.sidebar');

  if (sidebar && sidebar.parentNode) {
    sidebar.parentNode.removeChild(sidebar);
  }
}