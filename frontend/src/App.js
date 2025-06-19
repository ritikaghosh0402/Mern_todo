import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoItem from './components/TodoItem';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  const fetchTodos = async () => {
    const res = await axios.get('http://localhost:5000/api/todos');
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (title.trim() === '') return;
    await axios.post('http://localhost:5000/api/todos', { title });
    setTitle('');
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

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-indigo-600">📝 My To-Do List</h1>

        <div className="flex mb-4">
          <input
            className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new task..."
          />
          <button
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-r-md"
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
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
