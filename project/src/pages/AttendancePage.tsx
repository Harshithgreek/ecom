import React from 'react';
import FaceScanner from '../components/AttendanceSystem/FaceScanner';
import AttendanceList from '../components/AttendanceSystem/AttendanceList';

const AttendancePage: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Mark Attendance</h1>
      <FaceScanner />
      <AttendanceList />
    </div>
  );
};

export default AttendancePage;