import { AuthProvider } from './context/AuthContext';
import Authentication from './auth/authentication';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Authentication />
    </AuthProvider>
  );
}

export default App;