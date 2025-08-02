import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // adjust path if needed
import TaskTracker from "./TaskTracker";
import "./Dashboard.css";

const Dashboard = ({ user, onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [showPopups, setShowPopups] = useState(false);

  useEffect(() => {
    if (!user?.uid) return;

    const fetchTasks = async () => {
      try {
        const tasksRef = collection(db, "tasks");
        const q = query(tasksRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const taskList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(taskList);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [user]);

  useEffect(() => {
    const timer = setTimeout(() => setShowPopups(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const remainingTasks = totalTasks - completedTasks;
  const productivity = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="user-info">
          <div className="avatar">{user?.email?.[0]?.toUpperCase()}</div>
          <h2>Welcome, {user?.email}</h2>
        </div>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </header>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h4>Total Tasks</h4>
          <p>{totalTasks}</p>
        </div>
        <div className="stat-card">
          <h4>Completed</h4>
          <p>{completedTasks}</p>
        </div>
        <div className="stat-card">
          <h4>Productivity</h4>
          <p>{Math.round(productivity)}%</p>
        </div>
      </div>

      <div className="progress-section">
        <h4>Progress</h4>
        <progress value={productivity} max="100" />
      </div>

      {/* Delayed Motivational Popups */}
      {showPopups && (
        <div className="dashboard-popups">
          <div className="popup-card">
            <h4>🔔 Reminder</h4>
            <p>You have {remainingTasks} tasks remaining.</p>
          </div>
          <div className="popup-card">
            <h4>💡 Tip</h4>
            <p>Start your day by finishing a small task to build momentum.</p>
          </div>
          <div className="popup-card">
            <h4>🎯 Goal</h4>
            <p>Try to finish 1 more task today!</p>
          </div>
        </div>
      )}

      <section className="task-section">
        <TaskTracker />
      </section>
    </div>
  );
};

export default Dashboard;
