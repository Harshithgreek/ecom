import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import Card from '../UI/Card';
import { getAttendanceRecords, getAttendanceForToday } from '../../services/attendanceService';
import { AttendanceRecord } from '../../types';

const AttendanceList: React.FC = () => {
  const [todayRecords, setTodayRecords] = useState<AttendanceRecord[]>([]);
  const [allRecords, setAllRecords] = useState<AttendanceRecord[]>([]);
  const [activeTab, setActiveTab] = useState<'today' | 'all'>('today');
  
  useEffect(() => {
    // Load attendance records
    const today = getAttendanceForToday();
    const all = getAttendanceRecords().sort((a, b) => 
      new Date(b.checkInTime).getTime() - new Date(a.checkInTime).getTime()
    );
    
    setTodayRecords(today);
    setAllRecords(all);
  }, []);
  
  const formatDateTime = (dateTimeString: string) => {
    const date = parseISO(dateTimeString);
    return format(date, 'MMM dd, yyyy - h:mm a');
  };
  
  return (
    <Card title="Attendance Records" className="mt-8 max-w-3xl mx-auto">
      <div className="mb-4 border-b border-gray-200">
        <div className="flex -mb-px">
          <button
            className={`mr-4 py-2 px-4 text-sm font-medium ${
              activeTab === 'today'
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('today')}
          >
            Today
          </button>
          <button
            className={`mr-4 py-2 px-4 text-sm font-medium ${
              activeTab === 'all'
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('all')}
          >
            All Records
          </button>
        </div>
      </div>
      
      {activeTab === 'today' && (
        <>
          {todayRecords.length === 0 ? (
            <p className="text-gray-500 italic text-center py-6">
              No attendance records for today.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Check-in Time
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {todayRecords.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{record.userName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {format(parseISO(record.checkInTime), 'h:mm a')}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
      
      {activeTab === 'all' && (
        <>
          {allRecords.length === 0 ? (
            <p className="text-gray-500 italic text-center py-6">
              No attendance records found.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Check-in Time
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {allRecords.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{record.userName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {format(parseISO(record.date), 'MMM dd, yyyy')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {format(parseISO(record.checkInTime), 'h:mm a')}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </Card>
  );
};

export default AttendanceList;