export const showCompletion = () => {
  const container = document.querySelector('[data-plansModal]');
  container.classList.toggle('completion')
  const overlay = document.querySelector('[data-overlay]');

  const closeModal = () => {
    container.classList.toggle('hidden');
    overlay.classList.toggle('hidden');
    container.classList.toggle('completion')
  }

  container.innerHTML = `
    <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><circle fill="#3CB3AB" cx="32" cy="32" r="32"/><path stroke="#FFF" stroke-width="5" d="M20 31.86L28.093 40 44 24"/></g></svg>
    <h2>Thanks for your support!</h2>
    <p class="clr-gray">Your pledge brings us one step closer to sharing Mastercraft Bamboo Monitor Riser worldwide. You will get an email once our campaign is completed.</p>
    <button class="btn-green" data-closeModal>Got it!</button>
  `;

  const closeModalBtn = document.querySelector('[data-closeModal]');
  closeModalBtn.addEventListener('click', closeModal);
}
