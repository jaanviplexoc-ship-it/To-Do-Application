import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';

import TodoList from './component/TodoList';
import TodoForm from './component/TodoForm';
import TodoDashbord from './component/TodoDashbord';

import "./app.css";

function App() {

  const [todos, setTodos] = useState([]);

  const addTodo = (newTodo) => {
    setTodos ((previousTodos) => [...previousTodos,newTodo]);
  };

  //toggle todo

  const toggleTodo = (todoId) =>{
    setTodos((previousTodos) => 
      previousTodos.map((todo) => 
      todo.id === todoId ? {...todo, completed : !todo.completed} : todo)
    );
  };

  const editTodo = (todoId, updatedText) => {
    setTodos((previousTodos) => 
    previousTodos.map((todo) => 
    todo.id === todoId ? {
      ...todo,
      text: updatedText,
      completed: false,
    } : todo)
  );

  };

  const deleteTodo = (todoId) => {
    setTodos((previousTodos) => 
    previousTodos.filter((todo)=>
    todo.id !== todoId)
    );
  };

  return (
    <div>
      <Navbar />
      <Routes>
        <Route 
        path="/" 
        element={<TodoDashbord todos={todos}/>} 
        />

        <Route 
        path="/TodoForm" 
        element={<TodoForm
          todos={todos}
          onAddTodo={addTodo} />} 
        />

        <Route 
        path="/TodoList" 
        element={<TodoList 
        todos={todos}
        onToggleTodo={toggleTodo}
        onEditTodo={editTodo}
        onDeleteTodo={deleteTodo} />} 
        />

      </Routes>

    </div>
  )
  
};

export default App;
