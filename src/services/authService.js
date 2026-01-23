import api from './api';

export const authService = {
  // Register new user
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', {
        name: userData.name,
        phone: userData.phone,
        email: userData.email || null,
        password: userData.password,
        confirm_password: userData.confirmPassword,
        user_type: userData.userType,
      });

      if (response.data.success) {
        const { token, user } = response.data.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
      }

      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Registration failed' };
    }
  },

  // Login user
  login: async (phone, password) => {
    try {
      const response = await api.post('/auth/login', {
        phone,
        password,
      });

      if (response.data.success) {
        const { token, user } = response.data.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
      }

      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Login failed' };
    }
  },

  // Logout user
  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  // Get user profile
  getProfile: async () => {
    try {
      const response = await api.get('/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to get profile' };
    }
  },

  // Update profile
  updateProfile: async (userData) => {
    try {
      const response = await api.put('/profile', userData);
      if (response.data.success) {
        const user = response.data.data.user;
        localStorage.setItem('user', JSON.stringify(user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to update profile' };
    }
  },

  // Change password
  changePassword: async (currentPassword, newPassword, confirmPassword) => {
    try {
      const response = await api.post('/change-password', {
        current_password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });

      if (response.data.success) {
        const { token } = response.data.data;
        localStorage.setItem('token', token);
      }

      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to change password' };
    }
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

export default authService;