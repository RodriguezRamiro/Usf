
function addTask() {
let newTask = document.getElementById("new-task").value.trim();
 if (newTask === "") {
 alert("Please enter a task.");
  return;
 }
}
 let tasksList = document.getElementById("tasks");

 // Create a new list item
  let listItem = document.createElement("li");
  listItem.className = "task";

 // Display the task
  let taskText = document.createElement("span");
  taskText.textContent = newTask;

 // Create a delete button
  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "delete-button";
  deleteButton.onclick = function() {
         listItem.remove();
 };

 // Append the task and delete button to the list item
  listItem.appendChild(taskText);
  listItem.appendChild(deleteButton);

 // Append the list item to the tasks list
  tasksList.appendChild(listItem);

 // Clear the input field
  document.getElementById("new-task").value = "";


// retrieve from localStorage
const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
for (let i = 0; i < savedTodos.length; i++) {
  let newTodo = document.createElement("li");
  newTodo.innerText = savedTodos[i].task;
  newTodo.isCompleted = savedTodos[i].isCompleted ? true : false;
  if (newTodo.isCompleted) {
    newTodo.style.textDecoration = "line-through";
  }
  todoList.appendChild(newTodo);
}
todoForm.addEventListener("submit", function(event) {
    event.preventDefault();
    let newTodo = document.createElement("li");
    let taskValue = document.getElementById("task").value;
    newTodo.innerText = taskValue;
    newTodo.isCompleted = false;
    todoForm.reset();
    todoList.appendChild(newTodo);
  
    // save to localStorage
    savedTodos.push({ task: newTodo.innerText, isCompleted: false });
    localStorage.setItem("todos", JSON.stringify(savedTodos));
  });
  
todoList.addEventListener("click", function(event) {
    let clickedListItem = event.target;
   if (!clickedListItem.isCompleted) {
      clickedListItem.style.textDecoration = "line-through";
      clickedListItem.isCompleted = true;
    } else {
      clickedListItem.style.textDecoration = "none";
      clickedListItem.isCompleted = false;
    }

// breaks for duplicates -
 for (let i = 0; i < savedTodos.length; i++) {
 if (savedTodos[i].task === clickedListItem.innerText) {
        savedTodos[i].isCompleted = !savedTodos[i].isCompleted;
        localStorage.setItem("todos", JSON.stringify(savedTodos));
      }
    }
});
