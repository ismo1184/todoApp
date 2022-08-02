const todos = [];

const newTodo = document.querySelector("#newTodo");
const todoContainer = document.querySelector("#todoContainer");

newTodo.addEventListener("keydown", e => {
  if (e.keyCode === 13 && newTodo.value !== "") {
    addTodo();
  }
});

function addTodo() {
  let todo = {
    text: newTodo.value.trim(),
    checked: false,
    ID: Date.now(),
  };
  todos.push(todo);
  const todoItem = document.createElement("li");
  const todoSpan = document.createElement("span");
  todoSpan.textContent = newTodo.value;
  todoSpan.classList.add("todoText");
  todoItem.append(todoSpan);
  //set data-key attribute of li to ID
  todoItem.setAttribute("data-key", `${todo.ID}`);
  todoItem.classList.add("todoItem");
  todoContainer.append(todoItem);
  const todoIcon = document.createElement("span");
  todoIcon.classList.add("todoIcon");
  todoItem.prepend(todoIcon);
  //add a delete btn/svg
  const deleteSVG = document.createElement("img");
  deleteSVG.src = "images/icon-cross.svg";
  deleteSVG.classList.add("delete");
  todoItem.append(deleteSVG);
  newTodo.value = "";
  newTodo.focus();
}

function deleteTodo(ID) {
  const todoID = todos.map(todo => todo.ID);
  const todoIndex = todoID.indexOf(Number(ID));
  todos.splice(`${todoIndex}`, 1);
}

todoContainer.addEventListener("click", e => {
  if (e.target.classList.contains("delete")) {
    const ID = e.target.parentElement.dataset.key;
    deleteTodo(ID);
    const todoItem = document.querySelector(`[data-key= "${ID}"]`);
    todoItem.remove();
  }
});

function checkTodo(ID) {
  const todoID = todos.map(todo => todo.ID);
  const todoIndex = todoID.indexOf(Number(ID));
  todos[todoIndex].checked = true;
}

todoContainer.addEventListener("click", e => {
  if (e.target.classList.contains("todoIcon")) {
    const ID = e.target.parentElement.dataset.key;
    checkTodo(ID);
    const todoItem = document.querySelector(`[data-key= "${ID}"]`);
    todoItem.style.color = "red"; //Testing
  }
});
