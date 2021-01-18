document.addEventListener('DOMContentLoaded', () => {
	const game = document.querySelector('.game');
	const jumper = document.createElement('div');
	let jumperBottomSpace = 250;
	let jumperLeftSpace = 50;
	let platformsCount = 5;
	let platforms = [];
	let upTimerId;
	let downTimerId;

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
			platforms.push(newPlatform);
			// console.log(newPlatform);
		}
	}

	function movePlatforms() {
		if (jumperBottomSpace > 200) {
			platforms.forEach((platform) => {
				platform.bottom -= 4;
				let visual = platform.visual;
				visual.style.bottom = platform.bottom + 'px';
			});
		}
	}

	function jump() {
		clearInterval(downTimerId);
		upTimerId = setInterval(function () {
			jumperBottomSpace += 20;
			jumper.style.bottom = jumperBottomSpace + 'px';
			if (jumperBottomSpace > 350) {
				fall();
			}
		}, 30);
	}

	function fall() {
		clearInterval(upTimerId);
		downTimerId = setInterval(function () {
			jumperBottomSpace -= 5;
			jumper.style.bottom = jumperBottomSpace + 'px';
			if (jumperBottomSpace <= 0) {
				gameOver();
			}
		}, 30);
	}

	function gameOver() {
		console.log('Game Over');
		isGameOver = true;
		clearInterval(upTimerId);
		clearInterval(downTimerId);
	}

	function start() {
		if (!isGameOver) {
			createJumper();
			createPlatforms();
			setInterval(movePlatforms, 30);
			jump();
			fall();
		}
	}

	//attach to a button
	start();
});
