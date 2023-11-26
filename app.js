const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

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
	// Add the todos to the local storage
	saveLocalTodos(todoInput.value);
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
function deleteCheck(event){
	const item = event.target;
	// Delete Todo
	if(item.classList[0] === 'trash-btn'){
		const todo = item.parentElement;
		// Animation
		todo.classList.add("fall");
		removeLocalTodos(todo);
		todo.addEventListener("transitionend", ()=>{
			todo.remove();
		})

	}
	if(item.classList[0] === 'complete-btn'){
		const todo = item.parentElement;
		todo.classList.toggle('completed');
	}
}
function filterTodo(event){
	const todos = todoList.childNodes;
	todos.forEach((todo)=>{
		switch(event.target.value){
			case "all":
				todo.style.display = 'flex';
				break;
			case "completed":
				if(todo.classList.contains('completed')){
					todo.style.display = 'flex';
				}else{
					todo.style.display = 'none';
				}
				break;
			case "uncompleted":
				if(!todo.classList.contains('completed')){
					todo.style.display = 'flex';
				}else{
					todo.style.display = 'none';
				}
				break;
		}
	});
}
function saveLocalTodos(todo){
	//First thing first Check the local storages
	let todos;
	if(localStorage.getItem('todos') === null){
		todos = [];
	}else{
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	todos.push(todo);
	localStorage.setItem('todos', JSON.stringify(todos));
}
function getTodos(){
	let todos;
	if(localStorage.getItem('todos') === null){
		todos = [];
	}else{
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	todos.forEach((todo)=>{
		// Todo Div
	const todoDiv = document.createElement('div');
	todoDiv.classList.add("todo");
	// create Li
	const newTodo = document.createElement('li');
	newTodo.innerText = todo;
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
	});
}
function removeLocalTodos(todo){
	let todos;
	if(localStorage.getItem('todos') === null){
		todos = [];
	}else{
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	const todoIndex = todo.children[0].innerText;
	todos.splice(todos.indexOf(todoIndex), 1);
	localStorage.setItem("todos", JSON.stringify(todos));
}