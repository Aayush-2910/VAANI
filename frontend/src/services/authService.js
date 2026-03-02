import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { AUTHORIZED_USERS, isAuthorizedForRole, getRoleForEmail } from '../config/authorizedUsers';

const API_BASE_URL = 'http://localhost:8000/api';

// In-memory token storage (NOT localStorage)
let currentToken = null;

export const setToken = (token) => {
  currentToken = token;
};

export const getToken = () => {
  return currentToken;
};

export const clearToken = () => {
  currentToken = null;
};

// Export for use in other components if needed
export { AUTHORIZED_USERS, isAuthorizedForRole, getRoleForEmail };

// Email/Password Signup
export const signupWithEmail = async (email, password, role) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Get ID token
    const idToken = await user.getIdToken();
    setToken(idToken);
    
    // Try to assign role via backend, but continue if backend is not available
    try {
      await assignRole(role, idToken);
      return {
        success: true,
        user,
        role: role
      };
    } catch (backendError) {
      // Backend not available - store role temporarily in memory
      console.warn('Backend not available, role will be assigned when backend starts');
      // Store role temporarily (will be properly assigned when backend is available)
      sessionStorage.setItem('pendingRole', role);
      
      return {
        success: true,
        user,
        role: role, // Use the selected role temporarily
        needsBackend: true
      };
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

// Email/Password Login
export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Get ID token
    const idToken = await user.getIdToken();
    setToken(idToken);
    
    // Determine role based on email
    const role = getRoleForEmail(email);
    
    // Try to get user info including role from backend
    try {
      const userInfo = await getCurrentUser(idToken);
      
      // Verify backend role matches email-based role
      if (userInfo.role && userInfo.role !== role) {
        throw new Error('Invalid user credentials for this role');
      }
      
      return {
        success: true,
        user,
        role: role
      };
    } catch (backendError) {
      // Backend not available - use email-based role
      return {
        success: true,
        user,
        role: role,
        needsBackend: true
      };
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

// Google Popup Login
export const loginWithGoogle = async (role = null) => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    
    // Get ID token
    const idToken = await user.getIdToken();
    setToken(idToken);
    
    // Determine role based on email
    const emailBasedRole = getRoleForEmail(user.email);
    
    // Check if user already has a role
    try {
      const userInfo = await getCurrentUser(idToken);
      
      if (userInfo.role) {
        // Verify role matches email-based role
        if (userInfo.role !== emailBasedRole) {
          throw new Error('Invalid user credentials for this role');
        }
        
        return {
          success: true,
          user,
          role: emailBasedRole,
          isNewUser: false
        };
      }
    } catch (error) {
      // Backend not available or user doesn't have role yet
    }
    
    // If role provided, verify it matches email-based role
    if (role && role !== emailBasedRole) {
      throw new Error('Invalid user credentials for this role');
    }
    
    // Use email-based role
    if (role) {
      try {
        await assignRole(emailBasedRole, idToken);
        return {
          success: true,
          user,
          role: emailBasedRole,
          isNewUser: true
        };
      } catch (backendError) {
        // Backend not available
        return {
          success: true,
          user,
          role: emailBasedRole,
          isNewUser: true,
          needsBackend: true
        };
      }
    }
    
    return {
      success: true,
      user,
      role: emailBasedRole,
      isNewUser: true,
      needsRole: false
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Phone OTP Login - Setup
export const setupRecaptcha = (containerId) => {
  try {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      size: 'invisible',
      callback: () => {
        // reCAPTCHA solved
      }
    });
    return window.recaptchaVerifier;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Phone OTP Login - Send OTP
export const sendOTP = async (phoneNumber) => {
  try {
    const appVerifier = window.recaptchaVerifier;
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    
    // Store confirmation result for verification
    window.confirmationResult = confirmationResult;
    
    return {
      success: true,
      message: 'OTP sent successfully'
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Phone OTP Login - Verify OTP
export const verifyOTP = async (otp, role = null) => {
  try {
    const confirmationResult = window.confirmationResult;
    const userCredential = await confirmationResult.confirm(otp);
    const user = userCredential.user;
    
    // Get ID token
    const idToken = await user.getIdToken();
    setToken(idToken);
    
    // Phone numbers cannot be admin (admin must use email)
    // Determine role - phone users can only be volunteer or user
    let emailBasedRole = 'user'; // Default for phone login
    
    // Check if user already has a role
    try {
      const userInfo = await getCurrentUser(idToken);
      
      if (userInfo.role) {
        // Phone users cannot be admin
        if (userInfo.role === 'admin') {
          throw new Error('Admin users must login with email');
        }
        
        return {
          success: true,
          user,
          role: userInfo.role,
          isNewUser: false
        };
      }
    } catch (error) {
      // User doesn't have role yet
    }
    
    // If role provided, verify it's not admin
    if (role === 'admin') {
      throw new Error('Admin users must login with email');
    }
    
    // Use provided role or default to user
    const finalRole = role || 'user';
    
    try {
      await assignRole(finalRole, idToken);
      return {
        success: true,
        user,
        role: finalRole,
        isNewUser: true
      };
    } catch (backendError) {
      return {
        success: true,
        user,
        role: finalRole,
        isNewUser: true,
        needsBackend: true
      };
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

// Logout
export const logout = async () => {
  try {
    await signOut(auth);
    clearToken();
    return { success: true };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Backend API Calls

// Assign Role
export const assignRole = async (role, token = null) => {
  try {
    const idToken = token || getToken();
    
    if (!idToken) {
      throw new Error('No authentication token available');
    }
    
    const response = await fetch(`${API_BASE_URL}/auth/assign-role`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      },
      body: JSON.stringify({ role })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to assign role');
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get Current User Info
export const getCurrentUser = async (token = null) => {
  try {
    const idToken = token || getToken();
    
    if (!idToken) {
      throw new Error('No authentication token available');
    }
    
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${idToken}`
      }
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to get user info');
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

// Verify Token
export const verifyToken = async (token = null) => {
  try {
    const idToken = token || getToken();
    
    if (!idToken) {
      throw new Error('No authentication token available');
    }
    
    const response = await fetch(`${API_BASE_URL}/auth/verify-token`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${idToken}`
      }
    });
    
    if (!response.ok) {
      return { valid: false };
    }
    
    return await response.json();
  } catch (error) {
    return { valid: false };
  }
};

// Refresh Token
export const refreshToken = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      const idToken = await user.getIdToken(true); // Force refresh
      setToken(idToken);
      return idToken;
    }
    return null;
  } catch (error) {
    throw new Error(error.message);
  }
};
