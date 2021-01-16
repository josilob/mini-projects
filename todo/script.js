const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUl = document.getElementById('todos');

const todos = JSON.parse(localStorage.getItem('todos'));

if (todos) {
	todos.forEach((todo) => addTodo(todo));
}

form.addEventListener('submit', (e) => {
	e.preventDefault();
	addTodo();
});

function addTodo(todo) {
	let todoText = input.value;
	if (todo) {
		todoText = todo.text;
	}

	if (todoText) {
		const todoEl = document.createElement('li');
		if (todo && todo.completed) {
			todoEl.classList.add('completed');
		}
		todoEl.innerText = todoText;

		todoEl.addEventListener('click', () => {
			todoEl.classList.toggle('completed');
			updateLS();
		});

		todoEl.addEventListener('contextmenu', (e) => {
			e.preventDefault();
			todoEl.remove();
			updateLS();
		});

		todosUl.appendChild(todoEl);

		input.value = '';

		updateLS();
	}
}

function updateLS() {
	todosEl = document.querySelectorAll('li');
	const todos = [];
	todosEl.forEach((todoEl) => {
		todos.push({
			text: todoEl.innerText,
			completed: todoEl.classList.contains('completed'),
		});
	});

	localStorage.setItem('todos', JSON.stringify(todos));
}

// use browser API and local storage...we give it key and name to set the item which is saved as a string
// if we have an array or object, first we must wrap it in JSON.stringify()
// localStorage.setItem('name', JSON.stringify(obj));
// and we parse it out of local storage prior to getting item
// JSON.parse(localStorage.getItem(obj));
