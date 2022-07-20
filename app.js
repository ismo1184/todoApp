const todos = [];

const newTodo = document.querySelector("#newTodo");
const todoContainer = document.querySelector("#todoContainer");

newTodo.addEventListener("keydown", e => {
  if (e.keyCode === 13 && newTodo.value !== "") {
    addTodo();
  }
});

function addTodo() {
  {
    todos.push({ text: newTodo.value.trim(), checked: false, ID: Date.now() });
    const todoList = document.createElement("li");
    todoList.textContent = newTodo.value;
    todoContainer.append(todoList);
    const deleteBTN = document.createElement("button");
    deleteBTN.setAttribute("ID", `${Date.now()}`);
    todoList.append(deleteBTN);
    deleteBTN.textContent = "Delete";
    newTodo.value = "";
    //newTodo.focus();
  }
}

function deleteTodo(ID) {
  const todoID = todos.map(todo => todo.ID);
  todoID.indexOf(ID);
}
