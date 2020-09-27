import React from "react";

export default function Todo({ todo, toggleTodo }) {
  function todoClick() {
    toggleTodo(todo.id);
  }
  return (
    <div>
      <label className="todo">
        {todo.name}
        <input type="checkbox" checked={todo.complete} onChange={todoClick} />
      </label>
    </div>
  );
}
