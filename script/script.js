let todos = [];
let todoContainer = document.getElementById("todo-container");

document.getElementById("todo-enter").addEventListener("keypress", (event) => {
  addTodo(event);
  deleteTodo();
});
deleteTodo();

function addTodo(event) {
  let inputVal = document.getElementById("todo-enter").value;
  if (event.key === "Enter" || event.keyCode === 13 ) {
    todos.push(inputVal);
    event.currentTarget.value = "";

    let newDiv = document.createElement("label");
    newDiv.className = ("todo");
    todoContainer.appendChild(newDiv);

    let checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    newDiv.appendChild(checkBox);

    let todoName = document.createElement("span");
    todoName.className = ("todo-info");
    todoName.innerHTML = `${inputVal}`;
    newDiv.appendChild(todoName);

    let deleteBtn = document.createElement("div");
    deleteBtn.className = ("delete-todo");
    deleteBtn.innerHTML = `${"❌"}`
    newDiv.appendChild(deleteBtn);
  };
};

function deleteTodo(index) {
  let removeTodo = document.getElementsByClassName("delete-todo");
  for (let i = 0; i < removeTodo.length; i++) {
    removeTodo[i].addEventListener("click", function deleteMe() {
      todos.splice(index, 1);
      this.parentNode.remove();
    });
  };
};
