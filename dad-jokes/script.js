const jokeEl = document.getElementById('joke');
const jokeBtn = document.getElementById('jokeBtn');

jokeBtn.addEventListener('click', generateJoke);

generateJoke();

async function generateJoke() {
	const config = {
		headers: {
			Accept: 'application/json',
		},
	};
	// async/await method
	const response = await fetch('https://icanhazdadjoke.com', config);
	const data = await response.json();
	jokeEl.innerHTML = data.joke;

	// .then() method
	// fetch('https://icanhazdadjoke.com', config)
	// 	.then((res) => res.json())
	// 	.then((data) => {
	// 		jokeEl.innerHTML = data.joke;
	// 	});
}
