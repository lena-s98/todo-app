const input = document.getElementById("input");
const submitBtn = document.getElementById("submit");
const unfinishedList = document.getElementById("unfinished-list");

// Functions
function addItem(e) {
	e.preventDefault();

	const todoText = input.value;

	if (todoText === "") {
		alert("Please enter something");
	} else {
		createTodo(todoText);
	}
}

function createTodo(todoText) {
	// Create the elements
	const li = document.createElement("li");
	const span = document.createElement("span");
	const div = document.createElement("div");
	const checkBtn = createButton("fa-solid fa-check");
	const trashBtn = createButton("fa-solid fa-trash");

	// Set the text of the todo item
	span.textContent = todoText;

	// Append the elements to the list
	div.appendChild(checkBtn);
	div.appendChild(trashBtn);
	li.appendChild(span);
	li.appendChild(div);

	unfinishedList.appendChild(li);

	// Reset todoText value
	input.value = "";
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

// Event Listeners
submitBtn.addEventListener("click", addItem);
