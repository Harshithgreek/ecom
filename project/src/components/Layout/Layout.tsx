import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-dark-950">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <footer className="bg-dark-900/80 backdrop-blur-sm border-t border-dark-700/50 text-gray-400 py-4 text-center text-sm">
        <div className="container mx-auto px-4">
          <p className="flex items-center justify-center gap-2">
            <span className="text-primary-500">●</span>
            © {new Date().getFullYear()} Face Recognition Attendance System
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;