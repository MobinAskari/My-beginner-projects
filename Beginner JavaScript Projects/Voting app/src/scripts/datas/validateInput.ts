export const validateInput = (inputValue: string, alertElement: HTMLParagraphElement): boolean => {

  const showAlert = (message: string) => {
    alertElement.classList.remove('hidden')
    alertElement.textContent = message;
    return false;
  }
  
  const hideAlerts = () => {
    alertElement.classList.add('hidden');
    return true;
  }

  if (inputValue === '') return showAlert('This field cannot be empty!');

  if (inputValue.split('').some(char => char === ' ')) return showAlert('Whitespace character are not allowed!');
  
  return hideAlerts();

}