import React, { useState } from "react";

function NewTodoForm({ addTodo }) {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({ task });
    setTask("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="New Task"
      />
      <button>Add Todo</button>
    </form>
  );
}

export default NewTodoForm;
