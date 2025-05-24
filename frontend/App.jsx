import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import { RegistrationConfirmed } from './components/Registration/RegistrationConfirmed';
import EmailVerification from './components/EmailVerification/EmailVerification';
import { Dashboard } from './components/Dashboard/Dashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/registration-confirmed" element={<RegistrationConfirmed />} />
        <Route path="/verify-email/:token" element={<EmailVerification />} />
        
        {/* Protected routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App; 