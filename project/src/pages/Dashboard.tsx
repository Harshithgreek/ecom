import React from 'react';
import AttendanceStats from '../components/Dashboard/AttendanceStats';

const Dashboard: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <AttendanceStats />
    </div>
  );
};

export default Dashboard;