//I've tried to explain each JavaScript line with comments....Hope you'll understand

//selecting all required elements
const selectBox = document.querySelector('.select-box'),
	selectBtnX = selectBox.querySelector('.options .playerX'),
	selectBtnO = selectBox.querySelector('.options .playerO'),
	playBoard = document.querySelector('.playboard'),
	players = document.querySelector('.players'),
	allBox = document.querySelectorAll('section span'),
	resultBox = document.querySelector('.result-box'),
	wonText = resultBox.querySelector('.won-text'),
	replayBtn = resultBox.querySelector('button');

window.onload = () => {
	//once window loaded
	for (let i = 0; i < allBox.length; i++) {
		//add onclick attribute in all available span
		allBox[i].setAttribute('onclick', 'clickedBox(this)');
	}
};
selectBtnX.onclick = () => {
	selectBox.classList.add('hide'); //hide select box
	playBoard.classList.add('show'); //show the playboard section
};

selectBtnO.onclick = () => {
	selectBox.classList.add('hide'); //hide select box
	playBoard.classList.add('show'); //show the playboard section
	players.setAttribute('class', 'players active player'); //set class attribute in players with players active player values
};

let playerXIcon = 'fas fa-times';
let playerOIcon = 'fas fa-circle';

// user's click fn
function clickedBox(element) {
	if (players.classList.contains('player')) {
		element.innerHTML = `<i class="${playerOIcon}"></i>`; //add circle icon tag inside clicked element
		players.classList.add('active');
	} else {
		element.innerHTML = `<i class="${playerXIcon}"></i>`; // add cross to the same
		players.classList.add('active');
	}
	element.style.pointerEvents = 'none'; // once selected, that box can't be selected again
	let randomDelayTime = (Math.random() * 1000 + 200).toFixed(); //generate random bot delay
	setTimeout(() => {
		bot();
	}, randomDelayTime);
}

// bot click fn
function bot() {
	let array = []; // empty array to store inselected boxes in it
	for (let i = 0; i < allBox.length; i++) {
		//if there are no span elements
		if (allBox[i].childElementCount == 0) {
			// insert unselected ones
			array.push(i);
		}
	}
	let randomBox = array[Math.floor(Math.random() * array.length)];
	if (array.length > 0) {
		if (players.classList.contains('player')) {
			allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
			players.classList.add('active');
		} else {
			allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
			players.classList.add('active');
		}
	}
}
