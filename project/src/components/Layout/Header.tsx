import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserCircle, Calendar, Home, Users } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-dark-900/80 backdrop-blur-md border-b border-dark-700/50 text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center mb-4 sm:mb-0">
          <div className="bg-primary-500/20 p-2 rounded-lg mr-3">
            <UserCircle className="h-8 w-8 text-primary-400" />
          </div>
          <h1 className="text-xl font-bold text-white">
            Face <span className="text-primary-400">Attendance</span>
          </h1>
        </div>

        <nav className="flex space-x-1 sm:space-x-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg flex items-center transition-all duration-200 ${isActive
                ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                : 'text-gray-400 hover:bg-dark-800 hover:text-white'
              }`
            }
            end
          >
            <Home className="h-5 w-5 mr-1 sm:mr-2" />
            <span className="text-sm sm:text-base">Dashboard</span>
          </NavLink>

          <NavLink
            to="/attendance"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg flex items-center transition-all duration-200 ${isActive
                ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                : 'text-gray-400 hover:bg-dark-800 hover:text-white'
              }`
            }
          >
            <Calendar className="h-5 w-5 mr-1 sm:mr-2" />
            <span className="text-sm sm:text-base">Attendance</span>
          </NavLink>

          <NavLink
            to="/register"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg flex items-center transition-all duration-200 ${isActive
                ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                : 'text-gray-400 hover:bg-dark-800 hover:text-white'
              }`
            }
          >
            <Users className="h-5 w-5 mr-1 sm:mr-2" />
            <span className="text-sm sm:text-base">Register</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;