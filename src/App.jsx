import { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import Authentication from './auth/authentication';
import Dashboard from './pages/Dashboard';
import authService from './services/authService';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on mount
    const authenticated = authService.isAuthenticated();
    setIsAuthenticated(authenticated);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <AuthProvider>
      {isAuthenticated ? <Dashboard /> : <Authentication />}
    </AuthProvider>
  );
}

export default App;
       