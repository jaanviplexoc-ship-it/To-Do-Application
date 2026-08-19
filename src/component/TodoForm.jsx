import React, { useState } from "react";
import TodoModel from "../models/TodoModels";

function AddTodo({ todos = [], onAddTodo }) {
  const [todoText, setTodoText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const trimmedText = todoText.trim();

    //not allow empty todo

    if (!trimmedText) {
      alert("Don't allow empty Todo !!");
      return;
    }

    // create new todo
    const newTodo = TodoModel(trimmedText);

    onAddTodo(newTodo);

    //settodo empty after adding new todo

    setTodoText("");
  }

  return (
    <div className="todo-form-page">
      <div className="todo-form-header">
        <h1>Add Todo</h1>

        <p>Create a new task and keep your work organized.</p>
      </div>

      <form className="todo-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="formText">Task</label>
          <input
            id="formText"
            type="text"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            placeholder="Enter your todo..."
          />
        </div>

        <button type="submit" className="add-todo-btn">
          Add Todo
        </button>

        {/* Current Tasks */}
        <div className="form-todo-list">

            <div className="form-list-header">
                <h2>Current Tasks</h2>

                <span>
                    {todos.length}
                </span>
            </div>


            {todos.length === 0 ? (

                <p className="empty-message">
                    No tasks added yet.
                </p>

            ) : (

                <div className="current-task-list">

                    {todos.map((todo) => (

                        <div
                            className="current-task-item"
                            key={todo.id}
                        >
                            {todo.text}
                        </div>

                    ))}

                </div>

            )}

        </div>
      </form>
    </div>
  );
}

export default AddTodo;
