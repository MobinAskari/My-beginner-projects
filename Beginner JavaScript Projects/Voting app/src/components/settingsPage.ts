import { generateContainer } from "./getContainer";
import addHeader from "./header";
import addSidebar from "./sidebar";

export const showSettingsPage = () => {
  const container = generateContainer();
  container.classList.add('content');

  addHeader();
  addSidebar();
}