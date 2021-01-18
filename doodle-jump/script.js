document.addEventListener('DOMContentLoaded', () => {
	const game = document.querySelector('.game');
	const jumper = document.createElement('div');
	function createJumper() {
		game.appendChild(jumper);
		let jumperLeftSpace = 50;
		let jumperBottomSpace = 150;
		let isGameOver = false;
		jumper.classList.add('jumper');
		jumper.style.left = jumperLeftSpace + 'px';
		jumper.style.bottom = jumperBottomSpace + 'px';
	}
	createJumper();

	function start() {
		if (!isGameOver) {
			createJumper();
		}
	}

	//attach to a button
	start();
});
