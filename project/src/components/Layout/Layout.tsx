import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <footer className="bg-gray-100 text-gray-600 py-4 text-center text-sm">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} Face Recognition Attendance System</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;