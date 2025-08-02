import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import TaskTracker from "./TaskTracker";  // Your CRUD task list component
import CalendarView from "./CalendarView";
import GanttChart from "./GanttChart";
import Settings from "./Settings";
import "./Dashboard.css";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [view, setView] = useState("table");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/login");
      } else {
        setUser(user);
        fetchTasks(user.uid);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const fetchTasks = async (uid) => {
    try {
      const tasksRef = collection(db, "tasks"); // root tasks collection
      const q = query(tasksRef, where("userId", "==", uid));
      const tasksSnapshot = await getDocs(q);
      const fetchedTasks = tasksSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = tasks.length - completedTasks;
  const progress = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;

  // Render your views: calendar, gantt, or the TaskTracker CRUD list
  const renderView = () => {
    switch (view) {
      case "calendar":
        return <CalendarView tasks={tasks} />;
      case "gantt":
        return <GanttChart tasks={tasks} />;
      case "table":
      default:
        // Pass tasks AND fetchTasks so TaskTracker can update the list after CRUD ops
        return <TaskTracker tasks={tasks} refreshTasks={() => fetchTasks(user.uid)} />;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>📌 MyTaskTracker</h2>
        <ul>
          <li onClick={() => setView("table")}>🏠 Home</li>
          <li onClick={() => setView("calendar")}>📆 Calendar</li>
          <li onClick={() => setView("gantt")}>📊 Gantt</li>
          <li onClick={() => setView("settings")}>⚙️ Settings</li>
          <li onClick={logout}>🚪 Logout</li>
        </ul>
      </div>

      <div className="dashboard-main">
        <div className="dashboard-header">
          <h2>Welcome Back 👋</h2>
          {user && (
            <div className="user-info">
              <div className="avatar">{user.email?.charAt(0).toUpperCase()}</div>
              <span>{user.email}</span>
            </div>
          )}
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>📋 Total Tasks</h3>
            <p>{tasks.length}</p>
          </div>
          <div className="stat-card">
            <h3>✅ Completed</h3>
            <p>{completedTasks}</p>
          </div>
          <div className="stat-card">
            <h3>⏳ Pending</h3>
            <p>{pendingTasks}</p>
          </div>
        </div>

        <div className="progress-section">
          <h4>Progress</h4>
          <div
            className="progress-bar"
            style={{ background: "#eee", height: "20px", borderRadius: "10px" }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: "#4caf50",
                borderRadius: "10px",
              }}
            />
          </div>
          <p>{Math.round(progress)}%</p>
        </div>

        {renderView()}

        <div className="dashboard-popups">
          <div className="popup-card">
            <h4>💡 Tip</h4>
            <p>You can switch views from the left sidebar menu!</p>
          </div>
          <div className="popup-card">
            <h4>📈 Boost Productivity</h4>
            <p>Use the Gantt view to plan your timelines.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
