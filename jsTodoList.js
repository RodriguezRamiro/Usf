
        function addTask() {
            var newTask = document.getElementById("new-task").value.trim();

            if (newTask === "") {
                alert("Please enter a task.");
                return;
            }

            var tasksList = document.getElementById("tasks");

            // Create a new list item
            var listItem = document.createElement("li");
            listItem.className = "task";

            // Display the task
            var taskText = document.createElement("span");
            taskText.textContent = newTask;

            // Create a delete button
            var deleteButton = document.createElement("button");
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
        }