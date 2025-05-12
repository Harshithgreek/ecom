import React from 'react';
import RegistrationForm from '../components/FaceRegistration/RegistrationForm';
import UsersList from '../components/FaceRegistration/UsersList';

const RegisterPage: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Register Users</h1>
      <RegistrationForm />
      <UsersList />
    </div>
  );
};

export default RegisterPage;