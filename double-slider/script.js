const sliderContainer = document.querySelector('.slider-container');
const slideRight = document.querySelector('.right-slide');
const slideLeft = document.querySelector('.left-slide');
const upButton = document.querySelector('.up-btn');
const downButton = document.querySelector('.down-btn');
const slidesLength = slideRight.querySelectorAll('div').length;

let activeSlideIndex = 0;

//makes picture and slide match, since we move vertical position as many times as the position of the slide in the array
slideLeft.style.top = `-${(slidesLength - 1) * 100}vh`;

upButton.addEventListener('click', () => {
	changeSlide('up');
});
downButton.addEventListener('click', () => {
	changeSlide('down');
});

const changeSlide = (direction) => {
	const sliderHeight = sliderContainer.clientHeight;

	if (direction === 'up') {
		activeSlideIndex++;
		if (activeSlideIndex > slidesLength - 1) {
			activeSlideIndex = 0;
		}
	} else if (direction === 'down') {
		activeSlideIndex--;
		if (activeSlideIndex < 0) {
			activeSlideIndex = slidesLength - 1;
		}
	}

	slideLeft.style.transform = `translateY(${
		activeSlideIndex * sliderHeight
	}px)`;
	slideRight.style.transform = `translateY(-${
		activeSlideIndex * sliderHeight
	}px)`;
};
