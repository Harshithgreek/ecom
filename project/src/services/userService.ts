import { User } from '../types';

// In a real app, this would connect to a database
// For demo purposes, we're using localStorage
const USERS_STORAGE_KEY = 'face-recognition-users';

export const getUsers = (): User[] => {
  const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
  return usersJson ? JSON.parse(usersJson) : [];
};

export const saveUser = (user: User): void => {
  const users = getUsers();
  
  // Convert Float32Array to Array for storage
  const userForStorage = {
    ...user,
    imageDescriptor: Array.from(user.imageDescriptor),
  };
  
  const existingUserIndex = users.findIndex(u => u.id === user.id);
  
  if (existingUserIndex >= 0) {
    users[existingUserIndex] = userForStorage;
  } else {
    users.push(userForStorage);
  }
  
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

export const getUserById = (id: string): User | undefined => {
  const users = getUsers();
  const user = users.find(u => u.id === id);
  
  if (!user) return undefined;
  
  // Convert Array back to Float32Array
  return {
    ...user,
    imageDescriptor: new Float32Array(user.imageDescriptor as unknown as number[]),
  };
};

export const deleteUser = (id: string): void => {
  const users = getUsers();
  const filteredUsers = users.filter(user => user.id !== id);
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(filteredUsers));
};