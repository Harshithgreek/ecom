import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserCircle, Calendar, Home, Users } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-primary-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center mb-4 sm:mb-0">
          <UserCircle className="h-8 w-8 mr-2" />
          <h1 className="text-xl font-bold">Face Attendance</h1>
        </div>
        
        <nav className="flex space-x-1 sm:space-x-4">
          <NavLink 
            to="/" 
            className={({isActive}) => 
              `px-3 py-2 rounded-md flex items-center transition-colors ${
                isActive 
                  ? 'bg-primary-700 text-white' 
                  : 'text-primary-100 hover:bg-primary-500'
              }`
            }
            end
          >
            <Home className="h-5 w-5 mr-1 sm:mr-2" />
            <span className="text-sm sm:text-base">Dashboard</span>
          </NavLink>
          
          <NavLink 
            to="/attendance" 
            className={({isActive}) => 
              `px-3 py-2 rounded-md flex items-center transition-colors ${
                isActive 
                  ? 'bg-primary-700 text-white' 
                  : 'text-primary-100 hover:bg-primary-500'
              }`
            }
          >
            <Calendar className="h-5 w-5 mr-1 sm:mr-2" />
            <span className="text-sm sm:text-base">Attendance</span>
          </NavLink>
          
          <NavLink 
            to="/register" 
            className={({isActive}) => 
              `px-3 py-2 rounded-md flex items-center transition-colors ${
                isActive 
                  ? 'bg-primary-700 text-white' 
                  : 'text-primary-100 hover:bg-primary-500'
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