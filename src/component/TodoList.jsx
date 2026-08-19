import React ,{useMemo} from 'react'
import { useSearchParams } from 'react-router-dom'

function TodoList({todos = [], onToggleTodo}) {
    const [searchParams, setSearchParams] = useSearchParams();

    const statusFromUrl = searchParams.get("status");

    const activeFilter = 
    statusFromUrl === "pending" || statusFromUrl === "completed" ? 
    statusFromUrl : "all" ; 

    const filteredTodos = useMemo(() => {
        if(activeFilter === "pending"){
            return todos.filter((todo) => !todo.completed);
        }

        if(activeFilter === "completed"){
            return todos.filter((todo) => todo.completed);
        }

        return todos;
    }, [todos,activeFilter]);

    const handleFilterChange = (filter) =>{
        if(filter === "all"){
            setSearchParams({})
            return;
        }

        setSearchParams({
            status: filter,
        });
    };

    const handleTodoClick = (todoId) => {
        onToggleTodo(todoId);
    };

  return (
    <div className='todo-list-page'>
        <div className='todo-list-header'>
            <h1>My Tasks</h1>

            <p>Manage Your Tasks And Track your Progress.</p>
        </div>

        <div className='todo-filters'>

            <label htmlFor="task-filter">
                Filter Tasks
            </label>

            <select
                id="task-filter"
                value={activeFilter}
                onChange={(event) =>
                    handleFilterChange(event.target.value)
                }
            >

                <option value="all">
                    All
                </option>

                <option value="pending">
                    Pending
                </option>

                <option value="completed">
                    Completed
                </option>

            </select>

        </div>

            {/* task count */}

            <div className='todo-list-summary'>
                <span>
                    Showing {filteredTodos.length} task 
                    {filteredTodos.length !== 1? "s" : ""}
                </span>
            </div>

            {/* todo grid */}

            {filteredTodos.length === 0 ? 
                (<div className='empty-todo-state'>
                    <h2>No Tasks Found</h2>
                    <p>There are no tasks in this category.</p>
                </div>
                ):(
                    <div className='todo-grid'>
                        {filteredTodos.map((todo) => (

                            <div 
                            key={todo.id}
                            className={`todo-item ${
                                todo.completed ? "completed" : ""
                            }`}
                            onClick={() => handleTodoClick(todo.id)}
                            role='button'
                            tabIndex={0}
                            onKeyDown={(event) => {
                                if(event.key === "Enter" || event.key === " "){
                                    handleTodoClick(todo.id);
                                }
                            }}>

                                <input 
                                type='checkbox'
                                checked={todo.completed}
                                onChange={() => handleTodoClick(todo.id)}
                                onClick={(event) => event.stopPropagation()}
                                aria-label={`Mark "${todo.text}" as ${todo.completed ? "pending" : "completed"}`}
                                />

                                {/* todo text */}

                                <span className='todo-text'>
                                    {todo.text}
                                </span>
                            
                            </div>
                        ))}

                    </div>
                )
            }
    </div>
  )
}

export default TodoList