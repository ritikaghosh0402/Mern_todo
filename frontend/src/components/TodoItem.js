import React from 'react';

const TodoItem = ({ todo, onDelete, onToggle }) => (
  <div className="flex items-center justify-between p-2 border rounded-md hover:shadow-sm bg-gray-50">
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-4 h-4"
      />
      <span className={`text-sm ${todo.completed ? 'line-through text-gray-500' : ''}`}>
        {todo.title}
      </span>
    </div>
    <button
      onClick={() => onDelete(todo.id)}
      className="text-red-500 hover:text-red-700 text-sm font-bold"
    >
      ✖
    </button>
  </div>
);

export default TodoItem;
