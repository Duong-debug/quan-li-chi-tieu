// Auth utility functions

export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const token = localStorage.getItem('token');
  return !!token;
};

export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  return localStorage.getItem('token');
};

export const getUser = (): any | null => {
  if (typeof window === 'undefined') return null;
  
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

export const logout = () => {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/';
};

export const requireAuth = () => {
  if (typeof window === 'undefined') return;
  
  if (!isAuthenticated()) {
    window.location.href = '/';
  }
};
