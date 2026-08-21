import React, { useEffect, useState } from "react";
import TodoModel from "../models/TodoModels";
import { useNavigate, useSearchParams } from "react-router-dom";

function TodoForm({ todos = [], onAddTodo, onEditTodo }) {
  const [todoText, setTodoText] = useState("");
  const [todoDescription, setTodoDescription] = useState("");

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const editTodoId = searchParams.get("edit");

  const isEditMode = editTodoId !== null;

  const todoToEdit = todos.find(
    (todo) => String(todo.id) === String(editTodoId)
  );

  const isCompletedTodo = todoToEdit?.completed === true;

  // Load existing todo when edit mode starts

  useEffect(() => {
    if (!isEditMode) {
      return;
    }

    // const todoToEdit = todos.find(
    //   (todo) => String(todo.id) === String(editTodoId)
    // );


    if (todoToEdit) {
      setTodoText(todoToEdit.text);
      setTodoDescription(todoToEdit.description || "");
    }
  }, [todos, editTodoId, isEditMode]);

  function handleSubmit(e) {
    e.preventDefault();

    const trimmedText = todoText.trim();
    const trimmedDescription = todoDescription.trim();

    // Don't allow empty todo

    if (!trimmedText) {
      alert("Don't allow empty Todo !!");
      return;
    }

    // Edit existing todo

    if (isEditMode) {
      const updatedDescription = isCompletedTodo
      ? todoToEdit.description
      : trimmedDescription;

      onEditTodo(
        Number(editTodoId),
        trimmedText,
        trimmedDescription
      );

      navigate("/TodoList");
      return;
    }

    // Create new todo

    const newTodo = TodoModel(
      trimmedText,
      trimmedDescription
    );

    onAddTodo(newTodo);

    // Clear form

    setTodoText("");
    setTodoDescription("");
  }

  return (
    <div className="todo-form-page">
      <div className="todo-form-header">
        <h1>{isEditMode ? "Edit Todo" : "Add Todo"}</h1>

        <p>
          {isEditMode
            ? "Update your task and keep your work organized."
            : "Create a new task and keep your work organized."}
        </p>
      </div>

      <form className="todo-form" onSubmit={handleSubmit}>
        {/* Title */}

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

        {/* Description */}

        <div className="form-group">
          <label htmlFor="formDescription">
            Description
          </label>

          <textarea
            id="formDescription"
            value={todoDescription}
            onChange={(e) =>
              setTodoDescription(e.target.value)
            }
            placeholder="Describe your task..."
            rows="6"
            disabled={isCompletedTodo}
          />
        </div>

        <button type="submit" className="add-todo-btn">
          {isEditMode ? "Save Changes" : "Add Todo"}
        </button>

        {/* Current Tasks */}

        {/* <div className="form-todo-list">
          <div className="form-list-header">
            <h2>Current Tasks</h2>

            <span>{todos.length}</span>
          </div>
        </div> */}
      </form>
    </div>
  );
}

export default TodoForm;