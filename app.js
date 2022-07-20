const todos = [];

const newTodo = document.querySelector("#newTodo");
const todoContainer = document.querySelector("#todoContainer");

newTodo.addEventListener("keydown", e => {
  if (e.keyCode === 13 && newTodo.value !== "") {
    addTodo();
  }
});

function addTodo() {
  todos.push({
    text: newTodo.value.trim(),
    checked: false,
    ID: Date.now(),
  });
  const todoItem = document.createElement("li");
  todoItem.textContent = newTodo.value;
  todoContainer.append(todoItem);
  const deleteBTN = document.createElement("span");
  todoItem.append(deleteBTN);
  const deleteSVG = document.createElement("img");
  deleteSVG.src = "images/icon-cross.svg";
  deleteSVG.classList.add("delete");

  deleteBTN.append(deleteSVG);
  newTodo.value = "";
  newTodo.focus();
}

/*function deleteTodo(ID) {
  const todoID = todos.map(todo => todo.ID);
  const todoIndex = todoID.indexOf(ID);
  todos.splice(`${todoIndex}`, 1);
}*/

//adding event listener to ul, can't add to li because dynamic element
//attach eventlistener only to img.
todoContainer.addEventListener("click", e => {
  if (e.target.classList.contains("delete")) {
    console.log("clicked img");
  }
});
