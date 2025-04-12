import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../services/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const userData = await auth.login(email, password);
      localStorage.setItem('user', JSON.stringify(userData));
      setCurrentUser(userData);
      return userData;
    } catch (error) {
     console.log("fatch data error",error)
    }
  };

  const register = async (userData) => {
    try {
      const newUser = await auth.register(userData);
      return newUser;
    } catch (error) {
        console.log("fatch data error",error)

    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};