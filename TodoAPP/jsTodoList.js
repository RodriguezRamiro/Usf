// Retrieve the saved tasks from localStorage
let savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
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

    // Create a complete button
    const completeButton = document.createElement("button");
    completeButton.textContent = "Complete";
    completeButton.className = "complete-button";
    completeButton.onclick = function () {
        taskText.classList.toggle("completed");
        toggleTaskCompletionInLocalStorage(newTask);
    };

    // Create a delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";
    deleteButton.onclick = function() {
        tasksList.removeChild(listItem);
        removeTaskFromLocalStorage(newTask);
    };

    // Append the task text, complete button, and delete button to the list item
    listItem.appendChild(taskText);
    listItem.appendChild(completeButton);
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

// Function to toggle task completion in localStorage
function toggleTaskCompletionInLocalStorage(taskToToggle) {
    savedTodos = savedTodos.map(todo => {
        if (todo.task === taskToToggle) {
            todo.isCompleted = !todo.isCompleted;
        }
        return todo;
    });
    localStorage.setItem("todos", JSON.stringify(savedTodos));
}

// Function to remove task from localStorage
function removeTaskFromLocalStorage(taskToRemove) {
    savedTodos = savedTodos.filter(todo => todo.task !== taskToRemove);
    localStorage.setItem("todos", JSON.stringify(savedTodos));
}

// Function to load saved tasks from localStorage
function loadTasks() {
    for (let i = 0; i < savedTodos.length; i++) {
        const listItem = document.createElement("li");
        listItem.className = "task";

        // Create task text
        const taskText = document.createElement("span");
        taskText.textContent = savedTodos[i].task;

        // Create complete button
        const completeButton = document.createElement("button");
        completeButton.textContent = "Complete";
        completeButton.className = "complete-button";
        completeButton.onclick = function () {
            taskText.classList.toggle("completed");
            toggleTaskCompletionInLocalStorage(savedTodos[i].task);
        };

        if (savedTodos[i].isCompleted) {
            taskText.classList.add("completed");
        }

        // Create a delete button for loaded tasks
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";
        deleteButton.onclick = function () {
            tasksList.removeChild(listItem);
            removeTaskFromLocalStorage(savedTodos[i].task);
        };

        // Append the task text, complete button, and delete button to the list item
        listItem.appendChild(taskText);
        listItem.appendChild(completeButton);
        listItem.appendChild(deleteButton);
        tasksList.appendChild(listItem);
    }
}

// Event listener for adding tasks via Enter key
document.getElementById("new-task").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Load tasks on page load
window.onload = loadTasks;
