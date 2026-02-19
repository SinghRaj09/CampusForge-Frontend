import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AddProject from './pages/AddProject';
import MyProjects from './pages/MyProjects';
import ForgotPassword from './pages/Forgotpassword';
import ResetPassword from './pages/Resetpassword';
import VerifyEmail from './pages/VerifyEmail';
import AuthLayout from './components/AuthLayout';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token    = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* ── Public Routes (wrapped in AuthLayout) ─────────────── */}
        <Route path="/login"           element={<AuthLayout><Login onLogin={handleLogin} /></AuthLayout>} />
        <Route path="/signup"          element={<AuthLayout><SignUp onLogin={handleLogin} /></AuthLayout>} />
        <Route path="/forgot-password" element={<AuthLayout><ForgotPassword /></AuthLayout>} />
        <Route path="/reset-password"  element={<AuthLayout><ResetPassword /></AuthLayout>} />
        <Route path="/verify-email"    element={<AuthLayout><VerifyEmail /></AuthLayout>} />

        {/* ── Protected Routes ──────────────────────────────────── */}
        <Route
          path="/dashboard"
          element={isAuthenticated
            ? <Dashboard user={user} onLogout={handleLogout} />
            : <Navigate to="/login" replace />}
        />
        <Route
          path="/add-project"
          element={isAuthenticated
            ? <AddProject user={user} onLogout={handleLogout} />
            : <Navigate to="/login" replace />}
        />
        <Route
          path="/my-projects"
          element={isAuthenticated
            ? <MyProjects user={user} onLogout={handleLogout} />
            : <Navigate to="/login" replace />}
        />

        {/* ── Default ───────────────────────────────────────────── */}
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;