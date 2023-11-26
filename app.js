const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

todoButton.addEventListener("click", addTodo);

function addTodo(event){
	// To prevent the form from submitting
	event.preventDefault();
	// Todo Div
	const todoDiv = document.createElement('div');
	todoDiv.classList.add("todo");
	// create Li
	const newTodo = document.createElement('li');
	newTodo.innerText = todoInput.value;
	newTodo.classList.add("todo-item");
	todoDiv.appendChild(newTodo);
	// Now we have a div 'todoDiv' within a list of to do items 'newTodo'

	// Check Button
	const completedButton = document.createElement('button');
	completedButton.innerHTML = '<i class = "fas fa-check"></i>'
	completedButton.classList.add("complete-btn");
	todoDiv.appendChild(completedButton);

	// trash Button
	const trashButton = document.createElement('button');
	trashButton.innerHTML = '<i class = "fas fa-trash"></i>'
	trashButton.classList.add("trash-btn");
	todoDiv.appendChild(trashButton);

	// Append to List
	todoList.appendChild(todoDiv);

	// clear todo input value
	todoInput.value = "";
}
