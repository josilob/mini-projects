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
let playerSign = 'X'; // we guess this
let runBot = true;

// user's click fn
function clickedBox(element) {
	if (players.classList.contains('player')) {
		element.innerHTML = `<i class="${playerOIcon}"></i>`; //add circle icon tag inside clicked element
		playerSign = 'O'; // if player chooses O, we will switch the sign
		players.classList.add('active');
		//if player selects O than we change
		element.setAttribute('id', playerSign);
	} else {
		element.innerHTML = `<i class="${playerXIcon}"></i>`; // add cross to the same
		players.classList.add('active');
		element.setAttribute('id', playerSign);
	}
	selectWinner();
	playBoard.style.pointerEvents = 'none'; // once player makes a move, he can't check box until his move again
	element.style.pointerEvents = 'none'; // once selected, that box can't be selected again
	let randomDelayTime = (Math.random() * 1000 + 200).toFixed(); //generate random bot delay
	setTimeout(() => {
		bot(runBot);
	}, randomDelayTime);
}

// bot click fn
function bot(runBot) {
	if (runBot) {
		//first change playerSign, so if user has X, than bot will be O
		playerSign = 'O';
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
				players.classList.remove('active');
				//if user is O than the box id value will be X
				playerSign = 'X';
				allBox[randomBox].setAttribute('id', playerSign);
			} else {
				allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
				players.classList.remove('active');
				allBox[randomBox].setAttribute('id', playerSign);
			}
			selectWinner();
		}
		allBox[randomBox].style.pointerEvents = 'none'; // so we can't click over the field that bot has marked
		playBoard.style.pointerEvents = 'auto';
		playerSign = 'X';
	}
}

// winner logic

function getID(idname) {
	return document.querySelector('.box' + idname).id; // returning id name
}

function checkIDs(val1, val2, val3, sign) {
	if (getID(val1) == sign && getID(val2) == sign && getID(val3) == sign) {
		return true;
	}
}

function selectWinner() {
	// if one of the combinations is matches, select winner
	if (
		checkIDs(1, 2, 3, playerSign) ||
		checkIDs(4, 5, 6, playerSign) ||
		checkIDs(7, 8, 9, playerSign) ||
		checkIDs(1, 4, 7, playerSign) ||
		checkIDs(2, 5, 8, playerSign) ||
		checkIDs(3, 6, 9, playerSign) ||
		checkIDs(1, 5, 9, playerSign) ||
		checkIDs(3, 5, 7, playerSign)
	) {
		console.log(playerSign + ' ' + 'is the winner');
		runBot = false;
		bot(runBot);
	}
}
