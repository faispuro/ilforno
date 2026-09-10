const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const authService = {
  login: async (credentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Credenciales inválidas');
    }

    const data = await response.json();
    const token = data.access_token || data.token;

    if (token) {
      localStorage.setItem('token', token);
    }

    return data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  getCurrentUser: async () => {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/auth/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Token inválido o vencido');
    }

    return response.json();
  },
};