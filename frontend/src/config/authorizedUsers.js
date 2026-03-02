// Authorized users configuration
// This file defines which emails are authorized for which roles

export const AUTHORIZED_USERS = {
  // Only these emails can access admin dashboard
  admin: [
    'admin@vaani.gov.in'
  ],
  
  // These emails can access volunteer dashboard
  volunteer: [
    'volunteer@vaani.gov.in',
    'volunteer1@vaani.gov.in',
    'volunteer2@vaani.gov.in'
  ],
  
  // Any other email will be treated as regular user
  // Users can be any email not in admin or volunteer lists
};

// Helper function to check if email is authorized for a role
export const isAuthorizedForRole = (email, role) => {
  if (!email) return false;
  
  const lowerEmail = email.toLowerCase().trim();
  
  if (role === 'admin') {
    return AUTHORIZED_USERS.admin.includes(lowerEmail);
  } else if (role === 'volunteer') {
    return AUTHORIZED_USERS.volunteer.includes(lowerEmail);
  } else if (role === 'user') {
    // User can be anyone who is not admin or volunteer
    const isAdmin = AUTHORIZED_USERS.admin.includes(lowerEmail);
    const isVolunteer = AUTHORIZED_USERS.volunteer.includes(lowerEmail);
    return !isAdmin && !isVolunteer;
  }
  
  return false;
};

// Helper function to get role for an email
export const getRoleForEmail = (email) => {
  if (!email) return 'user';
  
  const lowerEmail = email.toLowerCase().trim();
  
  if (AUTHORIZED_USERS.admin.includes(lowerEmail)) {
    return 'admin';
  } else if (AUTHORIZED_USERS.volunteer.includes(lowerEmail)) {
    return 'volunteer';
  } else {
    return 'user';
  }
};

// Helper function to add new volunteer (for admin use)
export const addVolunteer = (email) => {
  const lowerEmail = email.toLowerCase().trim();
  if (!AUTHORIZED_USERS.volunteer.includes(lowerEmail)) {
    AUTHORIZED_USERS.volunteer.push(lowerEmail);
    return true;
  }
  return false;
};

// Helper function to remove volunteer (for admin use)
export const removeVolunteer = (email) => {
  const lowerEmail = email.toLowerCase().trim();
  const index = AUTHORIZED_USERS.volunteer.indexOf(lowerEmail);
  if (index > -1) {
    AUTHORIZED_USERS.volunteer.splice(index, 1);
    return true;
  }
  return false;
};
