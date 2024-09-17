import React, { useState } from "react";
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";

function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = (newTodo) => setTodos((todos) => [...todos, newTodo]);

  const removeTodo = (id) => setTodos(todos.filter((todo, idx) => idx !== id));

  const editTodo = (id, updatedTask) => {
    const updatedTodos = todos.map((todo, idx) =>
      idx === id ? { ...todo, task: updatedTask } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div>
      <NewTodoForm addTodo={addTodo} />
      {todos.map((todo, idx) => (
        <Todo
          key={idx}
          id={idx}
          task={todo.task}
          removeTodo={removeTodo}
          editTodo={editTodo}
        />
      ))}
    </div>
  );
}

export default TodoList;
