
import React, { createContext, useState, useContext, useEffect } from 'react';

// Define our user type
export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

// Define our authentication context
interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (username: string, email: string, password: string) => boolean;
  logout: () => void;
  changePassword: (oldPassword: string, newPassword: string) => boolean;
  users: User[];
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Sample user data
const initialUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    password: 'admin123',
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(() => {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : initialUsers;
  });
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Save users to localStorage when they change
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  // Save current user to localStorage when it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const login = (email: string, password: string): boolean => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const register = (username: string, email: string, password: string): boolean => {
    // Check if user already exists
    if (users.some(u => u.email === email)) {
      return false;
    }

    const newUser: User = {
      id: Date.now().toString(),
      username,
      email,
      password,
    };

    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const changePassword = (oldPassword: string, newPassword: string): boolean => {
    if (!currentUser || currentUser.password !== oldPassword) {
      return false;
    }

    const updatedUser = { ...currentUser, password: newPassword };
    setCurrentUser(updatedUser);
    
    // Update user in users array
    const updatedUsers = users.map(u => 
      u.id === currentUser.id ? updatedUser : u
    );
    setUsers(updatedUsers);
    
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        login,
        register,
        logout,
        changePassword,
        users,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
