export interface User {
  id: string;
  name: string;
  role: string;
  imageDescriptor: Float32Array;
  image: string;
}

export interface AttendanceRecord {
  id: string;
  userId: string;
  userName: string;
  checkInTime: string;
  date: string;
}

export interface AttendanceSummary {
  totalDays: number;
  presentDays: number;
  percentage: number;
  history: {
    date: string;
    status: 'present' | 'absent';
  }[];
}