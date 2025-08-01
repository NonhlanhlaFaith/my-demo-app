import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./firebase";
import 'bootstrap/dist/css/bootstrap.min.css';
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To wait for auth state load

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut();
  };

  if (loading) {
    return <p>Loading...</p>; // Or a spinner component while checking auth state
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />

        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <Login />}
        />

        <Route
          path="/signup"
          element={user ? <Navigate to="/dashboard" /> : <Signup />}
        />

        <Route
          path="/dashboard"
          element={
            user ? (
              <Dashboard user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Optional: Catch-all route redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
