import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

function TodoList({ todos = [], onToggleTodo, onDeleteTodo, onEditTodo }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editText, setEditText] = useState("");
  const [deleteTodoId, setDeleteTodoId] = useState(null);

  const statusFromUrl = searchParams.get("status");

  const activeFilter =
    statusFromUrl === "pending" || statusFromUrl === "completed"
      ? statusFromUrl
      : "all";

  const filteredTodos = useMemo(() => {
    if (activeFilter === "pending") {
      return todos.filter((todo) => !todo.completed);
    }

    if (activeFilter === "completed") {
      return todos.filter((todo) => todo.completed);
    }

    return todos;
  }, [todos, activeFilter]);

  const handleFilterChange = (filter) => {
    if (filter === "all") {
      setSearchParams({});
      return;
    }

    setSearchParams({
      status: filter,
    });
  };

  const handleTodoClick = (todoId) => {
    onToggleTodo(todoId);
  };

  // editing mode

  const handleEditStart = (todo) => {
    setEditingTodoId(todo.id);
    setEditText(todo.text);
  };

  // save edited todo

  const handleEditSave = (todoId) => {
    const trimmedText = editText.trim();

    if (!trimmedText) {
      return;
    }

    onEditTodo(todoId, trimmedText);

    setEditingTodoId(null);
    setEditText("");
  };

  //Edit cancle

  const handleEditCancel = () => {
    setEditingTodoId(null);
    setEditText("");
  };

  //open delete confirmation

  const handleDeleteStart = (todoId) => {
    setDeleteTodoId(todoId);
  };

  //confirm delete

  const handleDeleteConfirm = () => {
    if (deleteTodoId === null) {
      return;
    }

    onDeleteTodo(deleteTodoId);
    setDeleteTodoId(null);
  };

  //cancle delete

  const handleDeleteCancel = () => {
    setDeleteTodoId(null);
  };

  return (
    <div className="todo-list-page">
      <div className="todo-list-header">
        <h1>My Tasks</h1>

        <p>Manage Your Tasks And Track your Progress.</p>
      </div>

      <div className="todo-filters">
        <label htmlFor="task-filter">Filter Tasks</label>

        <select
          id="task-filter"
          value={activeFilter}
          onChange={(event) => handleFilterChange(event.target.value)}
        >
          <option value="all">All</option>

          <option value="pending">Pending</option>

          <option value="completed">Completed</option>
        </select>
      </div>

      {/* task count */}

      <div className="todo-list-summary">
        <span>
          Showing {filteredTodos.length} task
          {filteredTodos.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* todo grid */}

      {filteredTodos.length === 0 ? (
        <div className="empty-todo-state">
          <h2>No Tasks Found</h2>
          <p>There are no tasks in this category.</p>
        </div>
      ) : (
        <div className="todo-grid">
          {filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className={`todo-item ${todo.completed ? "completed" : ""}`}
              onClick={() => {
                if (editingTodoId !== todo.id) {
                  handleTodoClick(todo.id);
                }
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (editingTodoId === todo.id) {
                  return;
                }

                if (event.key === "Enter" || event.key === " ") {
                  handleTodoClick(todo.id);
                }
              }}
            >
              {/* Task Content */}

              <div className="todo-content">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleTodoClick(todo.id)}
                  onClick={(event) => event.stopPropagation()}
                  disabled={editingTodoId === todo.id}
                  aria-label={`Mark "${todo.text}" as ${
                    todo.completed ? "pending" : "completed"
                  }`}
                />

                {editingTodoId === todo.id ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={(event) => setEditText(event.target.value)}
                    onClick={(event) => event.stopPropagation()}
                    autoFocus
                  />
                ) : (
                  <span className="todo-text">{todo.text}</span>
                )}
              </div>

              {/* Actions */}

              <div
                className="todo-actions"
                onClick={(event) => event.stopPropagation()}
              >
                {editingTodoId === todo.id ? (
                  <>
                    <button
                      type="button"
                      onClick={() => handleEditSave(todo.id)}
                    >
                      Save
                    </button>

                    <button type="button" onClick={handleEditCancel}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button type="button" onClick={() => handleEditStart(todo)}>
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteStart(todo.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteTodoId !== null && (
        <div className="delete-modal-backdrop">
          <div
            className="delete-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-modal-title"
          >
            <h2 id="delete-modal-title">Delete Task?</h2>

            <p>
              Are you sure you want to delete this task? This action cannot be
              undone.
            </p>

            <div className="delete-modal-actions">
              <button type="button" onClick={handleDeleteCancel}>
                Cancel
              </button>

              <button type="button" onClick={handleDeleteConfirm}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoList;
