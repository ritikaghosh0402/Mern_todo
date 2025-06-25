import React, { useState } from 'react';

const TodoItem = ({ todo, onDelete, onToggle, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const handleSave = () => {
    if (editedTitle.trim() !== '') {
      onUpdate(todo.id, editedTitle);
      setIsEditing(false);
    }
  };

  return (
    <div
      className={`flex justify-between items-center p-3 mb-2 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm transition-all ${
        todo.completed ? 'opacity-60' : ''
      }`}
    >
      <div className="flex items-center gap-3 flex-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="w-5 h-5 accent-purple-500"
        />

        {isEditing ? (
          <input
            className="bg-transparent border-b border-white/30 text-white focus:outline-none px-1 flex-1"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        ) : (
          <span
            className={`text-white flex-1 ${
              todo.completed ? 'line-through' : ''
            }`}
          >
            {todo.title}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="text-green-400 hover:text-green-500 text-sm"
            >
              💾
            </button>
            <button
              onClick={() => {
                setEditedTitle(todo.title);
                setIsEditing(false);
              }}
              className="text-gray-300 hover:text-gray-400 text-sm"
            >
              ❌
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="text-yellow-400 hover:text-yellow-500 text-sm"
            >
              ✏️
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="text-red-400 hover:text-red-500 text-sm"
            >
              ❌
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
