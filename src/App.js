import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import uuidv4 from "uuid/v4";
import "./App.css";

const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function addTodo(e) {
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
    });
    todoNameRef.current.value = null;
  }

  function clearTodos() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }

  return (
    <div className="App">
      <div className="container">
        <h2>Todo List</h2>
        <input className="addTodo" ref={todoNameRef} type="text" />
        <button className="addButton" onClick={addTodo}>
          Add Todo
        </button>
        <div className="todoStatus">
          {todos.filter((todo) => !todo.complete).length} todos left
        </div>
        <div className="todoContainer">
          <TodoList todos={todos} toggleTodo={toggleTodo} />
        </div>
        <button className="completeButton" onClick={clearTodos}>
          Clear Completed
        </button>
      </div>
    </div>
  );
}

export default App;
