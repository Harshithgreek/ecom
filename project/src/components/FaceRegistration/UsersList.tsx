import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import Card from '../UI/Card';
import { getUsers, deleteUser } from '../../services/userService';
import { User } from '../../types';

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  
  useEffect(() => {
    // Load users from storage
    const loadedUsers = getUsers();
    setUsers(loadedUsers);
  }, []);
  
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(id);
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    }
  };
  
  if (users.length === 0) {
    return (
      <Card title="Registered Users" className="mt-8 max-w-3xl mx-auto">
        <p className="text-gray-500 italic text-center py-4">
          No users registered yet.
        </p>
      </Card>
    );
  }
  
  return (
    <Card title="Registered Users" className="mt-8 max-w-3xl mx-auto">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Photo
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-10 w-10 rounded-full overflow-hidden">
                    <img src={user.image} alt={user.name} className="h-10 w-10 object-cover" />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{user.role}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-error-500 hover:text-error-700 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default UsersList;