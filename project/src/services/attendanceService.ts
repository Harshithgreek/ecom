import { AttendanceRecord, AttendanceSummary } from '../types';
import { format, parseISO, isToday, subDays, isWithinInterval, startOfDay } from 'date-fns';

const ATTENDANCE_STORAGE_KEY = 'face-recognition-attendance';

export const getAttendanceRecords = (): AttendanceRecord[] => {
  const recordsJson = localStorage.getItem(ATTENDANCE_STORAGE_KEY);
  return recordsJson ? JSON.parse(recordsJson) : [];
};

export const saveAttendanceRecord = (record: AttendanceRecord): void => {
  const records = getAttendanceRecords();
  
  // Check if user already has attendance for today
  const existingRecord = records.find(
    r => r.userId === record.userId && r.date === record.date
  );
  
  if (existingRecord) {
    return; // User already marked attendance today
  }
  
  records.push(record);
  localStorage.setItem(ATTENDANCE_STORAGE_KEY, JSON.stringify(records));
};

export const getAttendanceForToday = (): AttendanceRecord[] => {
  const records = getAttendanceRecords();
  const today = format(new Date(), 'yyyy-MM-dd');
  return records.filter(record => record.date === today);
};

export const getAttendanceForUser = (userId: string): AttendanceRecord[] => {
  const records = getAttendanceRecords();
  return records.filter(record => record.userId === userId);
};

export const getUserAttendanceSummary = (userId: string): AttendanceSummary => {
  const records = getAttendanceForUser(userId);
  
  // For demonstration, we'll calculate attendance for the last 30 days
  const today = new Date();
  const historyDays = 30;
  const startDate = subDays(today, historyDays - 1);
  
  // Find days present
  const presentDays = new Set<string>();
  records.forEach(record => {
    const recordDate = parseISO(record.date);
    if (isWithinInterval(recordDate, { start: startDate, end: today })) {
      presentDays.add(record.date);
    }
  });
  
  // Build the history array for the last 30 days
  const history = Array.from({ length: historyDays }, (_, i) => {
    const date = format(subDays(today, i), 'yyyy-MM-dd');
    const status = presentDays.has(date) ? 'present' : 'absent';
    return { date, status };
  }).reverse();
  
  return {
    totalDays: historyDays,
    presentDays: presentDays.size,
    percentage: Math.round((presentDays.size / historyDays) * 100),
    history,
  };
};

export const isUserPresentToday = (userId: string): boolean => {
  const records = getAttendanceRecords();
  const today = format(new Date(), 'yyyy-MM-dd');
  return records.some(record => record.userId === userId && record.date === today);
};