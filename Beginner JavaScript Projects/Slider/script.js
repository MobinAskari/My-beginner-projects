const carouselItems = document.querySelectorAll('.carousel-item');

const nextButton = document.querySelector('.next');
const previousButton = document.querySelector('.previous');

removeActive()
let index = 0;
carouselItems[index].classList.add('active');

nextButton.addEventListener('click', () => {
	index >= carouselItems.length - 1 ? index = 0 : index++;
	removeActive()
	carouselItems[index].classList.add('active');
});

previousButton.addEventListener('click', () => {
	index === 0 ? index = carouselItems.length - 1 : index--;
	removeActive()
	carouselItems[index].classList.add('active'); 
})

function removeActive() {
	carouselItems.forEach(carouselItem => {
		carouselItem.classList.remove('active');
	});
}