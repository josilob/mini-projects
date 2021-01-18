document.addEventListener('DOMContentLoaded', () => {
	const game = document.querySelector('.game');
	const jumper = document.createElement('div');
	let jumperBottomSpace = 150;
	let jumperLeftSpace = 50;
	let platformsCount = 5;

	let isGameOver = false;
	function createJumper() {
		game.appendChild(jumper);
		jumper.classList.add('jumper');
		jumper.style.left = jumperLeftSpace + 'px';
		jumper.style.bottom = jumperBottomSpace + 'px';
	}
	createJumper();

	class Platform {
		constructor(newPlatformBottom) {
			this.left = Math.random() * 315;
			this.bottom = newPlatformBottom;
			this.visual = document.createElement('div');

			const visual = this.visual;
			visual.classList.add('platform');
			visual.style.left = this.left + 'px';
			visual.style.bottom = this.bottom + 'px';
			game.appendChild(visual);
		}
	}

	function createPlatforms() {
		for (let i = 0; i < platformsCount; i++) {
			let platformGap = 600 / platformsCount;
			let newPlatformBottom = 100 + i * platformGap;
			let newPlatform = new Platform(newPlatformBottom);
		}
	}

	function start() {
		if (!isGameOver) {
			createJumper();
			createPlatforms();
		}
	}

	//attach to a button
	start();
});
