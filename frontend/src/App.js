import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoItem from './components/TodoItem';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const fetchTodos = async () => {
    const res = await axios.get('http://localhost:5000/api/todos');
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (newTodo.trim() === '') return;
    await axios.post('http://localhost:5000/api/todos', { title: newTodo });
    setNewTodo('');
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
    fetchTodos();
  };

  const toggleTodo = async (id) => {
    await axios.put(`http://localhost:5000/api/todos/toggle/${id}`);
    fetchTodos();
  };

  const updateTodo = async (id, title) => {
    await axios.put(`http://localhost:5000/api/todos/${id}`, { title });
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-blue-400 to-blue-400 flex items-center justify-center p-4">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-2xl p-8 w-full max-w-md text-white">
        <h1 className="text-2xl font-bold mb-4 text-center text-white flex items-center justify-center gap-2">
          📝 My To-Do List
        </h1>

        <div className="flex space-x-2 mb-6">
          <input
            className="flex-1 px-4 py-2 rounded-lg bg-white/20 placeholder-white text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
            placeholder="Add a new task..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button
            className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-200"
            onClick={addTodo}
          >
            Add
          </button>
        </div>

        <div className="space-y-2">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={deleteTodo}
              onToggle={toggleTodo}
              onUpdate={updateTodo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
