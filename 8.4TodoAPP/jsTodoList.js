// Retrieve the saved tasks from localStorage
const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
const tasksList = document.getElementById("tasks");

// Function to add a new task
function addTask() {
    const newTask = document.getElementById("new-task").value.trim();

    if (newTask === "") {
        alert("Please enter a task.");
        return;
    }

    // Create a new list item
    const listItem = document.createElement("li");
    listItem.className = "task";

    // Display the task
    const taskText = document.createElement("span");
    taskText.textContent = newTask;

    // Create a delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";
    deleteButton.onclick = function() {
        tasksList.removeChild(listItem);
        removeTaskFromLocalStorage(newTask);
    };

    // Append the task and delete button to the list item
    listItem.appendChild(taskText);
    listItem.appendChild(deleteButton);
    tasksList.appendChild(listItem);

    // Save the new task to localStorage
    saveTaskToLocalStorage(newTask, false);

    // Clear the input field
    document.getElementById("new-task").value = "";
}

// Function to save task to localStorage
function saveTaskToLocalStorage(task, isCompleted) {
    savedTodos.push({ task, isCompleted });
    localStorage.setItem("todos", JSON.stringify(savedTodos));
}

// Function to remove task from localStorage
function removeTaskFromLocalStorage(taskToRemove) {
    const updatedTodos = savedTodos.filter(todo => todo.task !== taskToRemove);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
}

// Function to load saved tasks from localStorage
function loadTasks() {
    for (let i = 0; i < savedTodos.length; i++) {
        const newTodo = document.createElement("li");
        newTodo.innerText = savedTodos[i].task;
        newTodo.isCompleted = savedTodos[i].isCompleted;

        if (newTodo.isCompleted) {
            newTodo.style.textDecoration = "line-through";
        }

        // Create a delete button for loaded tasks
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";
        deleteButton.onclick = function() {
            tasksList.removeChild(newTodo);
            removeTaskFromLocalStorage(newTodo.innerText);
        };

        newTodo.appendChild(deleteButton);
        tasksList.appendChild(newTodo);
    }
}


// Event listener for adding tasks via Enter key
document.getElementById("new-task").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});
