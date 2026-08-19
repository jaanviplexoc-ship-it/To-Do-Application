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

  return (
    <div>
      <Navbar />
      <Routes>
        <Route 
        path="/TodoDashbord" 
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
        onToggleTodo={toggleTodo}/>} 
        />

      </Routes>

    </div>
  )
  
};

export default App;
