import React, { useState } from "react";
import { doc, deleteDoc, updateDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase"; // assuming you use auth
import {
  Pencil,
  Trash2,
  CheckCircle,
  RotateCcw,
  Save,
  PlusCircle,
} from "lucide-react";

const TaskTracker = ({ tasks, refreshTasks }) => {
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [newTask, setNewTask] = useState("");

  const handleAddTask = async () => {
    if (newTask.trim() === "") return;

    await addDoc(collection(db, "tasks"), {
      text: newTask,
      completed: false,
      createdAt: serverTimestamp(),
      userId: auth.currentUser?.uid || "anonymous", // Adjust based on your setup
    });

    setNewTask("");
    refreshTasks();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
    refreshTasks();
  };

  const handleEdit = (task) => {
    setEditingId(task.id);
    setEditedText(task.text);
  };

  const handleUpdate = async (id) => {
    await updateDoc(doc(db, "tasks", id), { text: editedText });
    setEditingId(null);
    setEditedText("");
    refreshTasks();
  };

  const toggleComplete = async (id, currentStatus) => {
    await updateDoc(doc(db, "tasks", id), { completed: !currentStatus });
    refreshTasks();
  };

  return (
    <div>
      <h3>Your Tasks</h3>

      {/* Add Task Form */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task"
          style={{ flexGrow: 1, padding: "8px" }}
        />
        <button onClick={handleAddTask} title="Add Task">
          <PlusCircle size={24} color="#28a745" />
        </button>
      </div>

      {/* Task Table */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f9f9f9" }}>
            <th style={{ padding: "8px", border: "1px solid #ddd" }}>Task</th>
            <th style={{ padding: "8px", border: "1px solid #ddd" }}>Status</th>
            <th style={{ padding: "8px", border: "1px solid #ddd" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} style={{ borderBottom: "1px solid #ccc" }}>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                {editingId === task.id ? (
                  <input
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    style={{ width: "100%" }}
                  />
                ) : (
                  task.text
                )}
              </td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                {task.completed ? "✅ Completed" : "⏳ Pending"}
              </td>
              <td
                style={{
                  padding: "8px",
                  border: "1px solid #ddd",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                {editingId === task.id ? (
                  <button onClick={() => handleUpdate(task.id)} title="Save">
                    <Save size={20} color="#007bff" />
                  </button>
                ) : (
                  <>
                    <button onClick={() => handleEdit(task)} title="Edit">
                      <Pencil size={20} color="#ffc107" />
                    </button>
                    <button onClick={() => handleDelete(task.id)} title="Delete">
                      <Trash2 size={20} color="#dc3545" />
                    </button>
                    <button
                      onClick={() => toggleComplete(task.id, task.completed)}
                      title={task.completed ? "Undo Complete" : "Mark Complete"}
                    >
                      {task.completed ? (
                        <RotateCcw size={20} color="#17a2b8" />
                      ) : (
                        <CheckCircle size={20} color="#28a745" />
                      )}
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTracker;
