document.addEventListener('DOMContentLoaded', () => {
	const game = document.querySelector('.game');
	const jumper = document.createElement('div');
	let startPoint = 150;
	let jumperBottomSpace = startPoint;
	let jumperLeftSpace = 50;
	let platformsCount = 5;
	let platforms = [];
	let upTimerId;
	let downTimerId;
	let isJumping = false;
	let isGameOver = false;
	let isGoingLeft = false;
	let isGoingRight = false;
	let leftTimerId;
	let rightTimerId;

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
			console.log(platforms);
		}
	}

	function createJumper() {
		game.appendChild(jumper);
		jumper.classList.add('jumper');
		jumperLeftSpace = platforms[0].left;
		jumper.style.left = jumperLeftSpace + 'px';
		jumper.style.bottom = jumperBottomSpace + 'px';
	}

	function movePlatforms() {
		if (jumperBottomSpace > 200) {
			platforms.forEach((platform) => {
				platform.bottom -= 4;
				let visual = platform.visual;
				visual.style.bottom = platform.bottom + 'px';

				if (platform.bottom < 10) {
					let firstPlatform = platforms[0].visual;
					firstPlatform.classList.remove('platform');
					platforms.shift();
					let newPlatform = new Platform(600);
					platforms.push(newPlatform);
				}
			});
		}
	}

	function jump() {
		isJumping = true;
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
		isJumping = false;
		clearInterval(upTimerId);
		downTimerId = setInterval(function () {
			jumperBottomSpace -= 5;
			jumper.style.bottom = jumperBottomSpace + 'px';
			if (jumperBottomSpace <= 0) {
				gameOver();
			}
			platforms.forEach((platform) => {
				if (
					jumperBottomSpace >= platform.bottom &&
					jumperBottomSpace <= platform.bottom + 15 &&
					jumperLeftSpace + 60 >= platform.left &&
					jumperLeftSpace <= platform.left + 85 &&
					!isJumping
				) {
					startPoint = jumperBottomSpace;
					jump();
					isJumping = true;
				}
			});
		}, 20);
	}

	function gameOver() {
		console.log('Game Over');
		isGameOver = true;
		clearInterval(upTimerId);
		clearInterval(downTimerId);
	}

	//assign functions to keyCodes
	function control(e) {
		jumper.style.bottom = jumperBottomSpace + 'px';
		if (e.key === 'ArrowLeft') {
			moveLeft();
		} else if (e.key === 'ArrowRight') {
			moveRight();
		} else if (e.key === 'ArrowUp') {
			moveStraight();
		}
	}

	function start() {
		if (!isGameOver) {
			createPlatforms();
			createJumper();
			setInterval(movePlatforms, 30);
			jump();
			document.addEventListener('keyup', control);
		}
	}

	function moveLeft() {
		if (isGoingRight) {
			clearInterval(rightTimerId);
			isGoingRight = false;
		}
		isGoingLeft = true;
		leftTimerId = setInterval(function () {
			if (jumperLeftSpace > 0) {
				jumperLeftSpace -= 10;
				jumper.style.left = jumperLeftSpace + 'px';
			} else moveRight();
		}, 30);
	}

	function moveRight() {
		if (isGoingLeft) {
			clearInterval(leftTimerId);
			isGoingLeft = false;
		}
		isGoingRight = true;
		rightTimerId = setInterval(function () {
			if (jumperLeftSpace <= 340) {
				jumperLeftSpace += 10;
				jumper.style.left = jumperLeftSpace + 'px';
			} else moveLeft();
		}, 30);
	}

	function moveStraight() {
		isGoingLeft = false;
		isGoingRight = false;
		clearInterval(rightTimerId);
		clearInterval(leftTimerId);
	}

	//attach to a button
	start();
});
