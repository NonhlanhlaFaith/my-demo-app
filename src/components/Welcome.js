import React from "react";
import { useNavigate } from "react-router-dom"; // or use your routing solution
import "./Welcome.css";

const Welcome = () => {
  const navigate = useNavigate();

  // Dummy data for the graph (could be replaced later with real data or charts)
  const data = [
    { day: "Mon", tasksCompleted: 3 },
    { day: "Tue", tasksCompleted: 5 },
    { day: "Wed", tasksCompleted: 2 },
    { day: "Thu", tasksCompleted: 7 },
    { day: "Fri", tasksCompleted: 6 },
  ];

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1>Welcome to TaskMaster</h1>
        <p>
          Stay productive and keep track of your daily tasks with ease. TaskMaster
          helps you organize, complete, and monitor your progress all in one place.
        </p>

        <div className="graph-container">
          <h3>Your Weekly Task Completion</h3>
          <div className="bar-chart">
            {data.map(({ day, tasksCompleted }) => (
              <div key={day} className="bar-wrapper">
                <div
                  className="bar"
                  style={{ height: `${tasksCompleted * 15}px` }}
                  title={`${tasksCompleted} tasks`}
                />
                <span className="bar-label">{day}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          className="get-started-btn"
          onClick={() => navigate("/login")} // adjust route as needed
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Welcome;
