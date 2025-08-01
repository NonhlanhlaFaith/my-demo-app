import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
  orderBy,
  Timestamp,
  onSnapshot,
} from "firebase/firestore";

// MUI
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UndoIcon from "@mui/icons-material/Undo";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// Toasts
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TaskTracker() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [viewingTask, setViewingTask] = useState(null);
  const [loading, setLoading] = useState(true);

  // Real-time Firestore task sync
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const q = query(
          collection(db, "tasks"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );

        const unsubscribeSnapshot = onSnapshot(
          q,
          (snapshot) => {
            const liveTasks = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setTasks(liveTasks);
            setLoading(false);
          },
          (error) => {
            console.error("Error listening to tasks:", error);
            toast.error("Failed to sync tasks.");
            setLoading(false);
          }
        );

        return unsubscribeSnapshot;
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAddTask = async () => {
    if (!taskInput.trim()) {
      toast.warn("Please enter a task.");
      return;
    }

    if (!auth.currentUser) {
      console.warn("No user is logged in");
      return;
    }

    try {
      await addDoc(collection(db, "tasks"), {
        text: taskInput.trim(),
        completed: false,
        userId: auth.currentUser.uid,
        createdAt: Timestamp.now(),
      });
      setTaskInput("");
      toast.success("Task added!");
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Failed to add task.");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
      toast.success("Task deleted.");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task.");
    }
  };

  const handleEditTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    setTaskInput(taskToEdit.text);
    setIsEditing(true);
    setCurrentTaskId(id);
  };

  const handleUpdateTask = async () => {
    if (!taskInput.trim()) {
      toast.warn("Please enter a task.");
      return;
    }

    try {
      const taskRef = doc(db, "tasks", currentTaskId);
      await updateDoc(taskRef, {
        text: taskInput.trim(),
      });
      setTaskInput("");
      setIsEditing(false);
      setCurrentTaskId(null);
      toast.success("Task updated!");
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task.");
    }
  };

  const handleToggleComplete = async (id) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    try {
      const taskRef = doc(db, "tasks", id);
      await updateDoc(taskRef, {
        completed: !task.completed,
      });
      toast.success(task.completed ? "Marked as incomplete." : "Task completed!");
    } catch (error) {
      console.error("Error toggling task completion:", error);
      toast.error("Failed to update task status.");
    }
  };

  const handleViewTask = (id) => {
    const task = tasks.find((t) => t.id === id);
    setViewingTask(task);
  };

  const closeView = () => {
    setViewingTask(null);
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 16 }}>
      <h2>Task Tracker</h2>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <TextField
          label="Enter task"
          variant="outlined"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          fullWidth
        />
        {isEditing ? (
          <Button variant="contained" color="secondary" onClick={handleUpdateTask}>
            Update
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleAddTask}>
            Add Task
          </Button>
        )}
      </div>

      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <List>
          {tasks.map((task) => (
            <ListItem
              key={task.id}
              divider
              secondaryAction={
                <>
                  <IconButton
                    edge="end"
                    aria-label="toggle complete"
                    onClick={() => handleToggleComplete(task.id)}
                    color={task.completed ? "success" : "default"}
                  >
                    {task.completed ? <UndoIcon /> : <CheckCircleIcon />}
                  </IconButton>
                  <IconButton edge="end" aria-label="view" onClick={() => handleViewTask(task.id)}>
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleEditTask(task.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteTask(task.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemText
                primary={task.text}
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  color: task.completed ? "gray" : "inherit",
                }}
              />
            </ListItem>
          ))}
        </List>
      )}

      <Dialog open={!!viewingTask} onClose={closeView}>
        <DialogTitle>Task Details</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            <strong>Task:</strong> {viewingTask?.text}
          </DialogContentText>
          <DialogContentText>
            <strong>Status:</strong> {viewingTask?.completed ? "✅ Completed" : "❌ Not Completed"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeView} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default TaskTracker;
