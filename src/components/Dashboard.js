import React, { useEffect, useState } from "react";
import TaskTracker from "./TaskTracker";
import "./Dashboard.css";

const Dashboard = ({ user, onLogout }) => {
  const [showPopups, setShowPopups] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopups(true);
    }, 500); // Delay popups by 0.5 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Welcome, {user?.email || "User"}</h2>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </header>

      <main>
        <TaskTracker />
        
        {showPopups && (
          <div className="dashboard-popups">
            <div className="popup-card">
              <h4>🔔 Reminder</h4>
              <p>You have 3 pending tasks today.</p>
            </div>
            <div className="popup-card">
              <h4>💡 Tip</h4>
              <p>Break big tasks into smaller steps for better progress.</p>
            </div>
            <div className="popup-card">
              <h4>🎯 Goal</h4>
              <p>Complete your tasks before the weekend!</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;

