import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  // Get user data from sessionStorage or localStorage
  const getStoredUserData = () => {
    const storedName = sessionStorage.getItem('userName') || localStorage.getItem('userName');
    const storedEmail = sessionStorage.getItem('userEmail') || localStorage.getItem('userEmail');
    
    return {
      name: storedName || 'User',
      email: storedEmail || 'user@vaani.gov.in',
      role: 'User',
      avatar: storedName ? storedName.charAt(0).toUpperCase() : 'U'
    };
  };

  const [userData, setUserData] = useState(getStoredUserData());

  const [systemStatus, setSystemStatus] = useState({
    online: true,
    pending: 2,
    critical: 0
  });

  const [notifications, setNotifications] = useState(3);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Update userData when storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setUserData(getStoredUserData());
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Check for updates on mount
    const updatedData = getStoredUserData();
    if (updatedData.name !== userData.name || updatedData.email !== userData.email) {
      setUserData(updatedData);
    }

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setNotifications(prev => Math.max(0, prev + Math.floor(Math.random() * 3) - 1));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <UserContext.Provider value={{ 
      userData, 
      setUserData,
      systemStatus, 
      setSystemStatus,
      notifications, 
      setNotifications,
      getGreeting 
    }}>
      {children}
    </UserContext.Provider>
  );
};
