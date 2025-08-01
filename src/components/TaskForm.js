import React, { useState } from 'react';

export default function TaskForm({ addTask }) {
  const [input, setInput] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!input.trim()) return;
    addTask(input.trim());
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex mb-3">
      <input
        type="text"
        className="form-control me-2"
        placeholder="Add a new task"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button type="submit" className="btn btn-primary">Add</button>
    </form>
  );
}
