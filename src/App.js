import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todoss, setTodos] = useState(
    localStorage.getItem("todos") === null
      ? []
      : JSON.parse(localStorage.getItem("todos"))
  );

  const todoName = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoss));
  }, [todoss]);

  // function that adds new todo
  function handleAddTodo(e) {
    const name = todoName.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
    });
    todoName.current.value = null;
  }

  function toggleTodo(id) {
    const newTodos = [...todoss];
    const todo = newTodos.find((todox) => todox.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function removeTodos() {
    const newTodos = todoss.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }

  return (
    <>
      <TodoList todos={todoss} toggleTodo={toggleTodo} />
      <input type="text" ref={todoName}></input>
      <button onClick={handleAddTodo}>Add todo</button>
      <button onClick={removeTodos}>Remove done todos</button>
      <div>{todoss.filter((todo) => !todo.complete).length} left to do</div>
    </>
  );
}

export default App;
