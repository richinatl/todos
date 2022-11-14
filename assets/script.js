// need to grab items from the user
// initialize an empty array
// render any todos stored
// store any new todos
// delete any being removed and rerender page

// initialize variables and get data from dom
const todoInput = document.querySelector("#todoAdd");
const todoForm = document.querySelector("#todoForm");
const todoList = document.querySelector("#todoList");
const todoCountSpan = document.querySelector("#todoCount");
let li;

let todos = [];

// The following function renders items in a todo list as <li> elements
function renderTodos() {
  // Clear todoList element and update todoCountSpan
  todoList.innerHTML = "";
  todoCountSpan.textContent = todos.length;

  // Render a new li for each todo
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];

    li = document.createElement("li");
    li.textContent = todo;
    li.setAttribute("dataIndex", i);

    const button = document.createElement("button");
    button.textContent = "Complete ✔️";

    li.appendChild(button);
    todoList.appendChild(li);
  }
}

// This function is being called below and will run when the page loads.
function init() {
  // Get stored todos from localStorage
  const storedTodos = JSON.parse(localStorage.getItem("todos"));

  // If todos retrieved from storage, update the todos array
  if (storedTodos !== null) {
    todos = storedTodos;
  }

  // render todos to the DOM
  renderTodos();
}

function storeTodos() {
  // Stringify and set key in storage
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Add submit event to form
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const todoText = todoInput.value.trim();

  // Return from function if todo is blank
  if (todoText === "") {
    return;
  }

  // Add new todo to the todos array, clear the input
  todos.push(todoText);
  todoInput.value = "";

  // Store updated todos in storage, rerender
  storeTodos();
  renderTodos();
});

// Add click event to todoList element
todoList.addEventListener("click", ({ target }) => {
  const element = target;

  // Check if element is a button
  if (element.matches("button") === true) {
    // Get its dataIndex value, remove the item
    const index = element.parentElement.getAttribute("dataIndex");
    todos.splice(index, 1);

    // Store updated todos in storage, rerender
    storeTodos();
    renderTodos();
  }
});

// Calls init to retrieve and render on page on load
init();
