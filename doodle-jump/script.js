document.addEventListener('DOMContentLoaded', () => {
	const game = document.querySelector('.game');
	const jumper = document.createElement('div');
	let isGameOver = false;
	let platformCount = 5;
	let platforms = [];
	let score = 0;
	let jumperLeftSpace = 50;
	let startPoint = 150;
	let jumperBottomSpace = startPoint;
	let upTimerId;
	let downTimerId;
	let isJumping = true;
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
		for (let i = 0; i < platformCount; i++) {
			let platformGap = 600 / platformCount;
			let newPlatformBottom = 100 + i * platformGap;
			let newPlatform = new Platform(newPlatformBottom);
			platforms.push(newPlatform);
		}
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
					score++;
					var newPlatform = new Platform(600);
					platforms.push(newPlatform);
				}
			});
		}
	}

	function createjumper() {
		game.appendChild(jumper);
		jumper.classList.add('jumper');
		jumperLeftSpace = platforms[0].left;
		jumper.style.left = jumperLeftSpace + 'px';
		jumper.style.bottom = jumperBottomSpace + 'px';
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

	function jump() {
		clearInterval(downTimerId);
		isJumping = true;
		upTimerId = setInterval(function () {
			jumperBottomSpace += 15;
			jumper.style.bottom = jumperBottomSpace + 'px';
			if (jumperBottomSpace > startPoint + 200) {
				fall();
				isJumping = false;
			}
		}, 30);
	}

	function moveLeft() {
		if (isGoingRight) {
			clearInterval(rightTimerId);
			isGoingRight = false;
		}
		isGoingLeft = true;
		leftTimerId = setInterval(function () {
			if (jumperLeftSpace >= 0) {
				jumperLeftSpace -= 5;
				jumper.style.left = jumperLeftSpace + 'px';
			} else moveRight();
		}, 20);
	}

	function moveRight() {
		if (isGoingLeft) {
			clearInterval(leftTimerId);
			isGoingLeft = false;
		}
		isGoingRight = true;
		rightTimerId = setInterval(function () {
			//changed to 313 to fit doodle image
			if (jumperLeftSpace <= 313) {
				jumperLeftSpace += 5;
				jumper.style.left = jumperLeftSpace + 'px';
			} else moveLeft();
		}, 20);
	}

	function moveStraight() {
		isGoingLeft = false;
		isGoingRight = false;
		clearInterval(leftTimerId);
		clearInterval(rightTimerId);
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

	function gameOver() {
		isGameOver = true;
		while (game.firstChild) {
			game.removeChild(game.firstChild);
		}
		game.innerHTML = score;
		clearInterval(upTimerId);
		clearInterval(downTimerId);
		clearInterval(leftTimerId);
		clearInterval(rightTimerId);
	}

	function start() {
		if (!isGameOver) {
			createPlatforms();
			createjumper();
			setInterval(movePlatforms, 30);
			jump(startPoint);
			document.addEventListener('keyup', control);
		}
	}
	start();
});
