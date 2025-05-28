import { createContext } from "react";
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile, 
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext); 
    }
export function AuthProvider({ children }) {
    Const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

  const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ currentUser, signup, login, logout }}>
        {!loading && children}
    </AuthContext.Provider>
  );
}
import React, { useContext, useState } from "react";