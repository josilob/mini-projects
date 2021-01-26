const imgs = document.getElementById('imgs');
const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');

const image = document.querySelectorAll('#imgs img'); //each image inside #imgs container

let idx = 0;

let interval = setInterval(run, 2500);

function run() {
	idx++;
	changeImage();
}

function changeImage() {
	if (idx > image.length - 1) {
		idx = 0;
	} else if (idx < 0) {
		idx = image.length - 1;
	}

	imgs.style.transform = `translateX(${-idx * 500}px)`;
}

function resetInterval() {
	clearInterval(interval); // so interval doesn't interfere with manual switches
	interval = setInterval(run, 2500); // re-set the same interval with count startin after click
}

rightBtn.addEventListener('click', () => {
	idx++;
	changeImage();
	resetInterval();
});
leftBtn.addEventListener('click', () => {
	idx--;
	changeImage();
	resetInterval();
});
