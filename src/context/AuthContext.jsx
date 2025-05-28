import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  const signup = (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setCurrentUser({ email });
        resolve();
      }, 500);
    });
  };

  const login = (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setCurrentUser({ email });
        resolve();
      }, 500);
    });
  };

  const logout = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setCurrentUser(null);
        resolve();
      }, 500);
    });
  };

  return (
    <AuthContext.Provider value={{ currentUser, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}