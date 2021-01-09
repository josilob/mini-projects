const APIURL = 'https://api.github.com/users/';

const form = document.getElementById('form');
const search = document.getElementById('search');

async function getUser(username) {
	//by default its axios.get() if other method is specified
	try {
		//we destructured data only, without remaining response
		const { data } = await axios(APIURL + username);
		console.log(data);
	} catch (err) {
		console.log(err);
	}

	// .then((res) => console.log(res.data))
	// .catch((err) => console.log(err)); //Old syntax pre-async/await
}

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const user = search.value;
	if (user) {
		getUser(user);
		search.value = '';
	}
});
