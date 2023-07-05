let addedTask = document.getElementById("taskList");

fetch("https://dummyjson.com/todos?limit=5")
  .then((response) => response.json())
  .then((res) => {
    console.log(res);
    if (res.todos) {
      res.todos.map((x) => {
        let li = document.createElement("li");
        let checkbox = document.createElement("input");
        checkbox.checked = x.completed;
        checkbox.type = "checkbox";
        let label = document.createElement("p");
        label.type = "text";
        label.textContent = x.todo;
        let deleteTasks = document.createElement("del");
        let editTask = document.createElement("button");
        let deleteOneTask = document.createElement("button");
        editTask.textContent = "Edit";
        deleteOneTask.textContent = "Delete";
        li.className = "task-item";
        addedTask.appendChild(li);
        li.appendChild(checkbox);
        li.appendChild(label);
        li.appendChild(deleteTasks);
        li.appendChild(editTask);
        li.appendChild(deleteOneTask);
      });
    } else {
      console.log("Tasks not found");
    }
  })
  .catch((error) => error);


let addButton = document.getElementById("addTaskButton");
let deleteTasks = document.getElementById("clearTasksButton");
let newaddedTask = document.getElementById("newTaskInput");
let editTask = document.createElement("button");
let deleteOneTask = document.createElement("button");
editTask.textContent = "Edit";
deleteOneTask.textContent = "Delete";


addButton.addEventListener("click", (event) => {
  event.preventDefault();
  fetch("https://dummyjson.com/todos/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      todo: newaddedTask.value,
      completed: false,
      userId: 23,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      let li = document.createElement("li");
      let checkbox = document.createElement("input");
      const newT = document.createElement("p");
      li.className = "task-item";
      checkbox.type = "checkbox";
      editTask.textContent = "Edit";
      deleteOneTask.textContent = "Delete";
      li.appendChild(checkbox);
      li.appendChild(newT);
      li.appendChild(editTask);
      li.appendChild(deleteOneTask);
      addedTask.appendChild(li);
      newT.textContent = response.todo;
    })
    .catch((error) => error);
});

editTask.addEventListener("click", (event) => {
  event.preventDefault();
  fetch("https://dummyjson.com/todos/10", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      todo: newaddedTask.value,
      completed: true,
      userId: 10,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
    })
    .catch((error) => error);
});


deleteOneTask.addEventListener("click", (event) => {
  event.preventDefault();
  fetch("https://dummyjson.com/todos/10", {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      newaddedTask.remove();
      deleteOneTask.parentNode.remove();
    })
    .catch((error) => error);
});
