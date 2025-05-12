import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import AttendancePage from './pages/AttendancePage';
import RegisterPage from './pages/RegisterPage';

// Create directory for face-api.js models
const createModelDir = () => {
  console.log('Models will be downloaded from CDN when needed');
};

function App() {
  useEffect(() => {
    createModelDir();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;