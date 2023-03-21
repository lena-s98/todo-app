const input = document.getElementById("input");
const submitBtn = document.getElementById("submit");
const unfinishedList = document.getElementById("unfinished-list");
const finishedList = document.getElementById("finished-list");

// Functions

// Add the item to the DOM
function addItem(e) {
	e.preventDefault();

	const inputText = input.value;

	if (inputText === "") {
		alert("Please enter something");
	} else {
		createTodo(inputText);
		addTodosToStorage(inputText);
	}
}

// Create the item
function createTodo(inputText) {
	// Create the elements
	const li = document.createElement("li");
	const span = document.createElement("span");
	const div = document.createElement("div");
	const checkBtn = createButton("fa-solid fa-check");
	const trashBtn = createButton("fa-solid fa-trash");

	// Set the text of the todo item
	span.textContent = inputText;

	// Append the elements to the list
	div.appendChild(checkBtn);
	div.appendChild(trashBtn);
	li.appendChild(span);
	li.appendChild(div);

	unfinishedList.appendChild(li);

	// Reset inputText value
	input.value = "";
}

function createFinishedTodo(inputText) {
	// Create the elements
	const li = document.createElement("li");
	const span = document.createElement("span");
	const div = document.createElement("div");
	const xBtn = createButton("fa-solid fa-x");
	const trashBtn = createButton("fa-solid fa-trash");

	// Set the text of the todo item
	span.textContent = inputText;

	// Append the elements to the list
	div.appendChild(xBtn);
	div.appendChild(trashBtn);
	li.appendChild(span);
	li.appendChild(div);

	finishedList.appendChild(li);
}

function createButton(classes) {
	const button = document.createElement("button");
	const icon = createIcon(classes);
	button.appendChild(icon);
	return button;
}

function createIcon(iconClass) {
	const icon = document.createElement("i");
	icon.className = iconClass;
	return icon;
}

// Get the local storage and parse it into an array
function getTodosFromStorage() {
	let todosFromStorage;

	if (localStorage.getItem("todos") === null) {
		todosFromStorage = [];
	} else {
		todosFromStorage = JSON.parse(localStorage.getItem("todos"));
	}

	return todosFromStorage;
}

// Add the todo item or finished item to local storage
function addTodosToStorage(inputText) {
	const todosFromStorage = getTodosFromStorage();

	todosFromStorage.push(inputText);

	localStorage.setItem("todos", JSON.stringify(todosFromStorage));
}

function getFinishedFromStorage() {
	let finishedFromStorage;

	if (localStorage.getItem("finished") === null) {
		finishedFromStorage = [];
	} else {
		finishedFromStorage = JSON.parse(localStorage.getItem("finished"));
	}

	return finishedFromStorage;
}

function addFinishedToStorage(inputText) {
	const finishedFromStorage = getFinishedFromStorage();

	finishedFromStorage.push(inputText);

	localStorage.setItem("finished", JSON.stringify(finishedFromStorage));
}

// Remove functions to remove either from the "todos" or the "finished" key in localStorage
function removeTodoFromStorage(item) {
	let todosFromStorage = getTodosFromStorage();
	todosFromStorage = todosFromStorage.filter((i) => i !== item);
	localStorage.setItem("todos", JSON.stringify(todosFromStorage));
}

function removeFinishedFromStorage(item) {
	let finishedFromStorage = getFinishedFromStorage();
	finishedFromStorage = finishedFromStorage.filter((i) => i !== item);
	localStorage.setItem("finished", JSON.stringify(finishedFromStorage));
}

function updateToDo(e) {
	const item = e.target.parentElement.parentElement.parentElement;
	const todoText =
		e.target.parentElement.parentElement.parentElement.firstElementChild
			.textContent;

	if (e.target.classList.contains("fa-check")) {
		item.remove();
		createFinishedTodo(todoText);
		removeTodoFromStorage(todoText);
		addFinishedToStorage(todoText);
	} else if (e.target.classList.contains("fa-x")) {
		item.remove();
		createTodo(todoText);
		removeFinishedFromStorage(todoText);
		addTodosToStorage(todoText);
	} else if (e.target.classList.contains("fa-trash")) {
		item.remove();
		removeTodoFromStorage(todoText);
		removeFinishedFromStorage(todoText);
	}
}

// Display items from the localStorage onto the DOM
function displayItems() {
	const todosFromStorage = getTodosFromStorage();
	const finishedFromStorage = getFinishedFromStorage();
	todosFromStorage.forEach((item) => createTodo(item));
	finishedFromStorage.forEach((item) => createFinishedTodo(item));
}

// Event Listeners
submitBtn.addEventListener("click", addItem);
unfinishedList.addEventListener("click", updateToDo);
finishedList.addEventListener("click", updateToDo);
document.addEventListener("DOMContentLoaded", displayItems);
