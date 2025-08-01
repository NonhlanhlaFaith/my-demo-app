import React from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";

function Welcome() {
  return (
    <div className="welcome-container">
      <h1>Welcome to MyTaskTracker</h1>
      <p>Manage your tasks efficiently and stay organized.</p>
      <Link to="/login" className="start-button">Get Started</Link>
    </div>
  );
}

export default Welcome;
