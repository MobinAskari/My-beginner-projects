export const addSidebar = () => {
  const body = document.body;
  let sidebar = document.querySelector('sidebar') as HTMLElement;  

  if (!sidebar) {
    sidebar = document.createElement('aside');
    sidebar.classList.add('sidebar');
    
    sidebar.innerHTML = `
      <nav>
        <ul>
          <li>
            <svg width="1.75rem" height="1.75rem">
              <use href="/icons.svg#icon_home">
            </svg>
            <p>Home</p>
          </li>
          <li>
            <svg width="1.75rem" height="1.75rem">
              <use href="/icons.svg#icon_categories">
            </svg>
            <p>Categories</p>
          </li>
          <li>
            <button class="sidebar-add-btn">
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
}