import React, { useState } from "react";

function Todo({ id, task, removeTodo, editTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTask, setNewTask] = useState(task);

  const toggleEdit = () => setIsEditing(!isEditing);

  const handleUpdate = (e) => {
    e.preventDefault();
    editTodo(id, newTask);
    toggleEdit();
  };

  return (
    <div>
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button>Update</button>
        </form>
      ) : (
        <div>
          <span>{task}</span>
          <button onClick={() => removeTodo(id)}>X</button>
          <button onClick={toggleEdit}>Edit</button>
        </div>
      )}
    </div>
  );
}

export default Todo;
