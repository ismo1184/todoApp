let todos = [];
let filteredTodos = todos;
let filterType = "all";

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
function getFilteredTodos(filterType) {
  if (filterType === "active") {
    return todos.filter(todo => !todo.checked);
  } else if (filterType === "completed") {
    return todos.filter(todo => todo.checked);
  } else {
    return todos;
  }
}

function addTodoItem(todo) {
  todos.push(todo);
  renderTodoItems(getFilteredTodos());
  newTodo.value = "";
  newTodo.focus();
  updateTodoCounter();
}

function renderTodoItems(todoArray) {
  todoContainer.innerHTML = "";
  todoArray.forEach(todo => {
    const todoItem = document.createElement("li");
    const todoSpan = document.createElement("span");
    todoSpan.textContent = todo.text;
    todoSpan.classList.add("todoText");
    todoItem.append(todoSpan);
    todoItem.setAttribute("data-key", `${todo.ID}`);
    todoItem.classList.add("todoItem");

    // Add the todoIcon span to every todoItem element
    const todoIcon = document.createElement("span");
    todoIcon.classList.add("todoIcon");
    todoItem.prepend(todoIcon);

    if (todo.checked) {
      todoIcon.classList.add("checkedIcon");
      todoItem.classList.add("checkedTodo");
    }

    const deleteSVG = document.createElement("img");
    deleteSVG.src = "images/icon-cross.svg";
    deleteSVG.classList.add("delete");
    todoItem.append(deleteSVG);
    todoContainer.append(todoItem);
  });
}

const completedTodos = document.querySelector(".completedTodos");
const activeTodos = document.querySelector(".activeTodos");
const allTodos = document.querySelector(".allTodos");

completedTodos.addEventListener("click", () => {
  filterType = "completed";
  const filteredTodos = getFilteredTodos(filterType);
  renderTodoItems(filteredTodos);
  updateTodoCounter();
});

activeTodos.addEventListener("click", () => {
  filterType = "active";
  const filteredTodos = getFilteredTodos(filterType);
  renderTodoItems(filteredTodos);
  updateTodoCounter();
});

allTodos.addEventListener("click", () => {
  filterType = "all";
  renderTodoItems(todos);
  updateTodoCounter();
});

const todoClearCompleted = document.querySelector(".todoClearCompleted");

todoClearCompleted.addEventListener("click", () => {
  todos = todos.filter(todo => !todo.checked);
  renderTodoItems(getFilteredTodos(filterType));
  updateTodoCounter();
});

function updateTodoCounter() {
  const remainingTodos = todos.filter(todo => !todo.checked);
  const todoRemain = document.querySelector(".todoRemain");
  const itemsLeftText =
    remainingTodos.length === 1 ? " item left" : " items left";
  todoRemain.innerText = remainingTodos.length + itemsLeftText;
}

function deleteTodoItem(ID) {
  const todoID = todos.map(todo => todo.ID);
  const todoIndex = todoID.indexOf(Number(ID));
  todos.splice(`${todoIndex}`, 1);
  updateTodoCounter();
}

todoContainer.addEventListener("click", e => {
  if (e.target.classList.contains("delete")) {
    const ID = e.target.parentElement.dataset.key;
    deleteTodoItem(ID);
    const todoItem = document.querySelector(`[data-key= "${ID}"]`);
    todoItem.remove();
  }
});

function checkTodoItem(ID, filterType) {
  const todo = getFilteredTodos(filterType).find(
    todo => todo.ID === Number(ID)
  );
  todo.checked = !todo.checked;

  const todoItem = document.querySelector(`[data-key="${ID}"]`);
  const todoIcon = todoItem.querySelector(".todoIcon");

  if (todo.checked) {
    todoIcon.classList.add("checkedIcon");
    todoItem.classList.add("checkedTodo");
  } else {
    todoIcon.classList.remove("checkedIcon");
    todoItem.classList.remove("checkedTodo");
  }
  updateTodoCounter();
}

todoContainer.addEventListener("click", e => {
  if (e.target.classList.contains("todoIcon")) {
    const ID = e.target.parentElement.dataset.key;
    checkTodoItem(ID);
  }
});
