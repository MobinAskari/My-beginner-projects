export default function handleAlertElement(
  element: HTMLParagraphElement,
  message: string,
  mount: "success" | "error" | "hide"
) {

  const changeColor = (color: string) => element.style.color = color;
  const setText = (text: string) => element.textContent = text;

  const showElement = () => {
    element.classList.remove("hidden");
    setText(message)
  }
  const hideElement = () => {
    element.classList.add("hidden");
    setText('');
  }

  const mounts = {
    success: () => {
      showElement()
      changeColor('var(--green800)');
    },
    error: () => {
      showElement()
      changeColor('var(--rose700)');
    },
    hide: () => hideElement()
  }

  if (mounts[mount]) mounts[mount]();
}