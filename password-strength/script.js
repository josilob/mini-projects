const password = document.getElementById('password');
const background = document.getElementById('background');

password.addEventListener('input', (e) => {
	const input = e.target.value;
	const length = input.length;
	const blurValue = 24 - length * 2;
	background.style.filter = `blur(${blurValue}px)`;
});
// Possible consideration of RegEx to include special characters, upper and downcase, ...
