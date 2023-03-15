const input = document.getElementById("input");
const submitBtn = document.getElementById("submit");
const unfinishedList = document.getElementById("unfinished-list");
const finishedList = document.getElementById("finished-list");
const deleteBtn = document.querySelectorAll("button:has(i.fa-trash)");

// Functions

// Add the item to the DOM
function addItem(e) {
	e.preventDefault();

	const inputText = input.value;

	if (inputText === "") {
		alert("Please enter something");
	} else {
		createTodo(inputText);
		addToStorage(inputText);
	}
}

// Create the item
function createTodo(inputText) {
	// Create the elements
	const li = document.createElement("li");
	const span = document.createElement("span");
	const div = document.createElement("div");
	const checkBtn = createButton("fa-solid fa-check", "check");
	const trashBtn = createButton("fa-solid fa-trash", "delete");

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

function createButton(classes, btnType) {
	const button = document.createElement("button");
	button.className = btnType;
	const icon = createIcon(classes);
	button.appendChild(icon);
	return button;
}

function createIcon(iconClass) {
	const icon = document.createElement("i");
	icon.className = iconClass;
	return icon;
}

// Add the todo item to local storage
function addToStorage(inputText) {
	const itemsFromStorage = getItemsFromStorage();

	itemsFromStorage.push(inputText);

	localStorage.setItem("todos", JSON.stringify(itemsFromStorage));
}

// Get the local storage and parse it into an array
function getItemsFromStorage() {
	let itemsFromStorage;
	if (localStorage.getItem("todos") === null) {
		itemsFromStorage = [];
	} else {
		itemsFromStorage = JSON.parse(localStorage.getItem("todos"));
	}

	return itemsFromStorage;
}

// Remove the item from the dom
function changeTodo(e) {
	if (e.target.classList.contains("fa-trash")) {
		e.target.parentElement.parentElement.parentElement.remove();
	}
}

// Event Listeners
submitBtn.addEventListener("click", addItem);
unfinishedList.addEventListener("click", changeTodo);
finishedList.addEventListener("click", changeTodo);
