// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { doc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebaseConfig';
 import { onSnapshot } from 'firebase/firestore';

interface AuthContextType {
  isAuthenticated: boolean;
  isProfiled: boolean;
  isLoading: boolean;
  setIsProfiled: (value: boolean) => void;
  user: User | null;
  logout: () => Promise<void>;
  isAdmin:boolean;
  setIsAdmin: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProfiled, setIsProfiled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);



useEffect(() => {
  const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
    setIsLoading(true);
    if (user) {
      setUser(user);
      setIsAuthenticated(true);

      const userDocRef = doc(db, `users/${user.uid}`);

      const unsubscribeSnapshot = onSnapshot(userDocRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          setIsProfiled(!!data.name); // o campo specifico
          setIsAdmin(!!data.isAdmin);
        } else {
          setIsProfiled(false);
          setIsAdmin(false);
        }
        setIsLoading(false);
      });

      // Cleanup del listener Firestore quando l'utente si disconnette
      return () => {
        unsubscribeSnapshot();
      };
    } else {
      setUser(null);
      setIsAuthenticated(false);
      setIsProfiled(false);
      setIsAdmin(false);
      setIsLoading(false);
    }
  });

  return () => unsubscribeAuth();
}, []);



  const logout = async () => {
    setIsLoading(true);
    await signOut(auth);
    setIsAuthenticated(false);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated,isProfiled, isLoading, setIsProfiled, user, logout, isAdmin, setIsAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
