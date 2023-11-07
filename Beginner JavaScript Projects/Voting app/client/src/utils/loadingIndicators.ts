export function getLoadingIndictor(element: HTMLElement, count: number) {
	const loadingIndicatorHTML = `
		<div class="loading-object-container">
			<div class="loading-object">

			</div>
		</div>
	`;

	element.innerHTML = '';
	for (let i = 0; i < count; i++) {
		element.insertAdjacentHTML('beforeend', loadingIndicatorHTML);
	}

}

export function clearLoadingIndictors(element: HTMLElement) {
	const loadings = element.querySelectorAll('.loading-object-container');

	loadings.forEach(loading => loading.parentNode?.removeChild(loading));

}

export function setButtonLoadingState(
	button: HTMLButtonElement,
	text: string = 'Loading...'
) {

	if (button instanceof HTMLButtonElement) {
		button.disabled = true;
		button.classList.add('disabledBtn');
		button.textContent = text;
	}

}

export function clearButtonLoadingState(
	button: HTMLButtonElement,
	text: string
) {

	if (button instanceof HTMLButtonElement) {
		button.disabled = false;
		button.classList.remove('disabledBtn');
		button.textContent = text;
	}

}