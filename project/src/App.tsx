import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { Auth } from './pages/Auth';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (email: string, password: string) => {
    // Simple authentication for demo
    if (email && password) {
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        {isAuthenticated && <Navbar onLogout={handleLogout} />}
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/auth" replace />}
          />
          <Route
            path="/auth"
            element={!isAuthenticated ? <Auth onLogin={handleLogin} /> : <Navigate to="/" replace />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;