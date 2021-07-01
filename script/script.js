let todos = [];

function addTodo(text) {
  const todo = {
    text,
    checked: false,
    id: Date.now(),
  };

  todos.push(todo);
  displayTodo(todo);
  console.log(todos);
};

// When the user hits enter within the input box, the value is passed into a variable and the addTodo function is called
document.getElementById("todo-enter").addEventListener("keypress", event => {
  if (event.key === "Enter" || event.key === 13 ) {
    let inputVal = document.getElementById("todo-enter");
    const text = inputVal.value.trim();
    if (text !== "") {
      addTodo(text);
      inputVal.value = "";
    };
  };
});

function displayTodo(todo) {
  const list = document.querySelector("#todo-container");
  const item = document.querySelector(`[data-key='${todo.id}']`);

  if (todo.deleted) {
    item.remove();
    return
  }

  let todoContainer = document.getElementById("todo-container");

  const isChecked = todo.checked ? "done" : "";

  let newDiv = document.createElement("label");
  newDiv.setAttribute("class", `todo${isChecked}`);
  newDiv.setAttribute("data-key", todo.id);
  todoContainer.appendChild(newDiv);

  let checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  newDiv.appendChild(checkBox);

  let todoName = document.createElement("span");
  todoName.className = ("todo-info");
  todoName.innerHTML = `${todo.text}`;
  newDiv.appendChild(todoName);

  let deleteBtn = document.createElement("div");
  deleteBtn.className = ("delete-todo");
  deleteBtn.innerHTML = `${"❌"}`;
  newDiv.appendChild(deleteBtn);

  if (item) {
    list.replaceChild(newDiv, item);
  } else {
    list.append(newDiv);
  }
};

const list = document.querySelector("#todo-container");

list.addEventListener("click", (event) => {
  if (event.target.classList.contains("checkbox")) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }

  if (event.target.classList.contains("delete-todo")) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteTodo(itemKey);
  };
});

function deleteTodo(key) {
  const index = todos.findIndex((item) => item.id === Number(key));
  
  const todo = {
    deleted: true,
    ...todos[index]
  };

  todos = todos.filter(item => item.id !== Number(key));
  displayTodo(todo);
}
