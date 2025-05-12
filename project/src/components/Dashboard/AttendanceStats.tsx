import React, { useState, useEffect } from 'react';
import { User, Calendar, UserCheck, Clock } from 'lucide-react';
import Card from '../UI/Card';
import { getUsers } from '../../services/userService';
import { getAttendanceForToday, getUserAttendanceSummary } from '../../services/attendanceService';
import { User as UserType } from '../../types';

const AttendanceStats: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [users, setUsers] = useState<UserType[]>([]);
  const [todayCount, setTodayCount] = useState(0);
  const [attendancePercentage, setAttendancePercentage] = useState(0);
  
  useEffect(() => {
    // Load users and today's attendance
    const loadedUsers = getUsers();
    setUsers(loadedUsers);
    
    if (loadedUsers.length > 0) {
      setSelectedUser(loadedUsers[0].id);
    }
    
    const todayRecords = getAttendanceForToday();
    setTodayCount(todayRecords.length);
  }, []);
  
  useEffect(() => {
    if (selectedUser) {
      const summary = getUserAttendanceSummary(selectedUser);
      setAttendancePercentage(summary.percentage);
    }
  }, [selectedUser]);
  
  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(e.target.value);
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
      <Card className="col-span-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Attendance Dashboard</h2>
        <p className="text-gray-600 mb-6">
          Monitor attendance statistics and user performance
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-primary-50 rounded-lg p-4 border border-primary-100">
            <div className="flex items-center">
              <div className="bg-primary-100 rounded-full p-3 mr-4">
                <User className="h-6 w-6 text-primary-500" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-gray-800">{users.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-secondary-50 rounded-lg p-4 border border-secondary-100">
            <div className="flex items-center">
              <div className="bg-secondary-100 rounded-full p-3 mr-4">
                <Calendar className="h-6 w-6 text-secondary-500" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Today's Attendance</p>
                <p className="text-2xl font-bold text-gray-800">{todayCount}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-accent-50 rounded-lg p-4 border border-accent-100">
            <div className="flex items-center">
              <div className="bg-accent-100 rounded-full p-3 mr-4">
                <UserCheck className="h-6 w-6 text-accent-500" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Attendance Rate</p>
                <p className="text-2xl font-bold text-gray-800">
                  {users.length > 0 ? Math.round((todayCount / users.length) * 100) : 0}%
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-gray-100 rounded-full p-3 mr-4">
                <Clock className="h-6 w-6 text-gray-500" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Time</p>
                <p className="text-2xl font-bold text-gray-800">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      <Card title="User Attendance" className="col-span-full md:col-span-1">
        <div className="mb-4">
          <label htmlFor="user-select" className="block text-sm font-medium text-gray-700 mb-1">
            Select User
          </label>
          <select
            id="user-select"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
            value={selectedUser}
            onChange={handleUserChange}
          >
            {users.length === 0 ? (
              <option value="">No users registered</option>
            ) : (
              users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))
            )}
          </select>
        </div>
        
        {selectedUser && (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Monthly Attendance</h3>
              <div className="relative pt-1">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block text-primary-600">
                      {attendancePercentage}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary-100">
                  <div 
                    style={{ width: `${attendancePercentage}%` }} 
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500"
                  ></div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Performance</h3>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className={`rounded-lg p-2 ${attendancePercentage >= 75 ? 'bg-success-50 text-success-700' : 'bg-gray-100 text-gray-500'}`}>
                  Good
                </div>
                <div className={`rounded-lg p-2 ${attendancePercentage >= 50 && attendancePercentage < 75 ? 'bg-warning-50 text-warning-700' : 'bg-gray-100 text-gray-500'}`}>
                  Average
                </div>
                <div className={`rounded-lg p-2 ${attendancePercentage < 50 ? 'bg-error-50 text-error-700' : 'bg-gray-100 text-gray-500'}`}>
                  Poor
                </div>
              </div>
            </div>
          </>
        )}
      </Card>
      
      <Card title="Attendance Calendar" className="col-span-full md:col-span-1">
        {selectedUser ? (
          <div className="space-y-2">
            {getUserAttendanceSummary(selectedUser).history.slice(0, 10).map((day, index) => (
              <div 
                key={index} 
                className={`flex items-center p-2 rounded ${
                  day.status === 'present' 
                    ? 'bg-success-50 border-l-4 border-success-500' 
                    : 'bg-gray-50 border-l-4 border-gray-300'
                }`}
              >
                <div className="flex-1">
                  <div className="text-sm font-medium">
                    {new Date(day.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                </div>
                <div>
                  <span 
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      day.status === 'present' 
                        ? 'bg-success-100 text-success-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {day.status === 'present' ? 'Present' : 'Absent'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic text-center py-6">
            Select a user to view attendance calendar.
          </p>
        )}
      </Card>
    </div>
  );
};

export default AttendanceStats;