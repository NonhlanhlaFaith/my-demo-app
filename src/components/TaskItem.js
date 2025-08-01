import React, { useState } from 'react';

export default function TaskItem({ task, toggleTaskDone, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleSave = () => {
    if (editText.trim()) {
      editTask(task.id, editText.trim());
      setIsEditing(false);
    }
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {isEditing ? (
        <input
          type="text"
          className="form-control me-2"
          value={editText}
          onChange={e => setEditText(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') handleSave();
            if (e.key === 'Escape') {
              setEditText(task.text);
              setIsEditing(false);
            }
          }}
          autoFocus
        />
      ) : (
        <span
          onClick={() => toggleTaskDone(task.id)}
          style={{ 
            textDecoration: task.done ? 'line-through' : 'none', 
            cursor: 'pointer',
            flexGrow: 1,
          }}
          title="Click to toggle complete"
        >
          {task.text}
        </span>
      )}

      <div>
        {isEditing ? (
          <>
            <button className="btn btn-sm btn-success me-1" onClick={handleSave}>Save</button>
            <button className="btn btn-sm btn-secondary" onClick={() => { setEditText(task.text); setIsEditing(false); }}>Cancel</button>
          </>
        ) : (
          <>
            <button className="btn btn-sm btn-outline-primary me-1" onClick={() => setIsEditing(true)}>Edit</button>
            <button className="btn btn-sm btn-outline-danger" onClick={() => deleteTask(task.id)}>Delete</button>
          </>
        )}
      </div>
    </li>
  );
}
