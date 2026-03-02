import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { setToken, clearToken, getCurrentUser, refreshToken } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Get fresh token
          const idToken = await firebaseUser.getIdToken();
          setToken(idToken);
          
          // Get user info with role
          const userInfo = await getCurrentUser(idToken);
          
          setUser(firebaseUser);
          setRole(userInfo.role);
        } catch (error) {
          console.error('Error fetching user info:', error);
          setUser(firebaseUser);
          setRole(null);
        }
      } else {
        setUser(null);
        setRole(null);
        clearToken();
      }
      setLoading(false);
    });

    // Token refresh every 50 minutes (tokens expire in 1 hour)
    const tokenRefreshInterval = setInterval(async () => {
      if (auth.currentUser) {
        try {
          await refreshToken();
        } catch (error) {
          console.error('Token refresh failed:', error);
        }
      }
    }, 50 * 60 * 1000);

    return () => {
      unsubscribe();
      clearInterval(tokenRefreshInterval);
    };
  }, []);

  const value = {
    user,
    role,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
