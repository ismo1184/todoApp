const todos = [];

const newTodo = document.querySelector("#newTodo");
const todoContainer = document.querySelector("#todoContainer");

newTodo.addEventListener("input", event => {
  const maxLength = 40;
  if (newTodo.value.length > maxLength) {
    newTodo.value = newTodo.value.slice(0, maxLength);
  }
});

todoForm.addEventListener("submit", event => {
  event.preventDefault();
  const newTodoValue = newTodo.value.trim();
  if (newTodoValue) {
    const todo = createTodoObject(newTodoValue);
    addTodoItem(todo);
  }
});

function createTodoObject(text) {
  return {
    text: text,
    checked: false,
    ID: Date.now(),
  };
}

function addTodoItem(todo) {
  todos.push(todo);
  renderTodoItem(todo);
  newTodo.value = "";
  newTodo.focus();
}

function renderTodoItem(todo) {
  const todoItem = document.createElement("li");
  const todoSpan = document.createElement("span");
  todoSpan.textContent = todo.text;
  todoSpan.classList.add("todoText");
  todoItem.append(todoSpan);
  todoItem.setAttribute("data-key", `${todo.ID}`);
  todoItem.classList.add("todoItem");
  todoContainer.append(todoItem);
  const todoIcon = document.createElement("span");
  todoIcon.classList.add("todoIcon");
  todoItem.prepend(todoIcon);
  const deleteSVG = document.createElement("img");
  deleteSVG.src = "images/icon-cross.svg";
  deleteSVG.classList.add("delete");
  todoItem.append(deleteSVG);
}

function deleteTodoItem(ID) {
  const todoID = todos.map(todo => todo.ID);
  const todoIndex = todoID.indexOf(Number(ID));
  todos.splice(`${todoIndex}`, 1);
}

todoContainer.addEventListener("click", e => {
  if (e.target.classList.contains("delete")) {
    const ID = e.target.parentElement.dataset.key;
    deleteTodoItem(ID);
    const todoItem = document.querySelector(`[data-key= "${ID}"]`);
    todoItem.remove();
  }
});

function checkTodoItem(ID) {
  const todoID = todos.map(todo => todo.ID);
  const todoIndex = todoID.indexOf(Number(ID));
  if (todos[todoIndex].checked === true) {
    todos[todoIndex].checked = false;
  } else {
    todos[todoIndex].checked = true;
  }
}

todoContainer.addEventListener("click", e => {
  if (e.target.classList.contains("todoIcon")) {
    const ID = e.target.parentElement.dataset.key;
    checkTodoItem(ID);
    const todoItem = document.querySelector(`[data-key= "${ID}"]`);
    todoItem.classList.toggle("checkedTodo");
    const checkedIcon = todoItem.querySelector("span");
    checkedIcon.classList.toggle("checkedIcon");
  }
});

const completedTodos = document.querySelector(".completedTodos");

completedTodos.addEventListener("click", () => {
  // Filter the todos array to only include the completed todos
  const completed = todos.filter(todo => todo.checked);

  // Render the completed todos in the container
  renderTodos(completed);
});
