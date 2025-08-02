import React from "react";
import "./TableView.css"; // Optional: you can create this file for styling

const TableView = ({ tasks }) => {
  return (
    <div className="table-view">
      <h3>📋 Task Table</h3>
      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <table className="task-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{new Date(task.date).toLocaleDateString()}</td>
                <td>
                  {task.completed ? (
                    <span className="status completed">Completed</span>
                  ) : (
                    <span className="status pending">Pending</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TableView;
