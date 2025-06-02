import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null); // Create the context

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // State to hold user data
  const [loadingAuth, setLoadingAuth] = useState(true); // Optional: Loading state for initial auth check

  useEffect(() => {
    // Check for authentication status and user data on initial load
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    const userData = localStorage.getItem('currentUser');

    if (loggedInStatus && userData) {
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(userData)); // Parse the stored JSON data
    }
    setLoadingAuth(false); // Authentication check is complete
  }, []);

  // Function to handle successful login
  const login = (userData) => {
    setIsAuthenticated(true);
    setCurrentUser(userData);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', JSON.stringify(userData)); // Store user data as JSON string
  };

  // Function to handle logout
  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
  };

  // The value provided to consumers of the context
  const value = {
    isAuthenticated,
    currentUser,
    loadingAuth, // Provide loading state
    login, // Provide login function
    logout, // Provide logout function
  };

  // Render children with the context value
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to easily consume the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
