import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">My Task App</Link>
      <div className="navbar-nav">
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/tasks">Tasks</Link>
      </div>
    </nav>
  );
}

export default Navbar;

