const box = document.querySelector('.box');
const text = box.querySelector('h1');
const range = 100; //px

function shadow(e) {
	const { offsetWidth: width, offsetHeight: height } = box;
	let { offsetX: x, offsetY: y } = e;

	if (this !== e.target) {
		x = x + e.target.offsetLeft;
		y = y + e.target.offsetTop;
	}

	const xRange = Math.round((x / width) * range - range / 2);
	const yRange = Math.round((y / height) * range - range / 2);

	text.style.textShadow = `
        ${xRange}px ${yRange}px 0 rgba(227, 47, 2,0.7),
        ${xRange}px ${yRange * -1}px 0 rgba(227, 96, 2,0.7),
        ${xRange * -1}px ${yRange}px 0 rgba(245, 200, 76,0.7),
        ${xRange * -1}px ${yRange * -1}px 0 rgba(245, 222, 76,0.7)
    `;
}

box.addEventListener('mousemove', shadow);
