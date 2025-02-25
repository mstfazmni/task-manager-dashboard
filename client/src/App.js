import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import AuthContainer from './components/AuthContainer';
import Introduction from './components/Introduction';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Contact from './components/Contact';
import About from './components/About';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for token and user data in local storage (using consistent token key)
    const token = localStorage.getItem('authToken');
    const storedUser = JSON.parse(localStorage.getItem('user'));
    console.log(token,storedUser)
    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Use consistent token key
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <Router>
      <div className='app-class'>
        <Header onLogout={handleLogout} isAuthenticated={isAuthenticated} user={user} />
        <Routes>
          <Route
            path='/'
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <>
                  <Introduction />
                  <AuthContainer setIsAuthenticated={setIsAuthenticated} />
                </>
              )
            }
          />
          <Route
            path='/dashboard'
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/" replace />}
          />
          {/* Add the Profile route */}
          <Route
            path='/profile'
            element={isAuthenticated ? <Profile /> : <Navigate to="/" replace />}
          />
          {/* Add the Contact route */}
          <Route
            path='/contact'
            element={isAuthenticated ? <Contact /> : <Navigate to="/" replace />}
          />
          {/* Add the About route */}
          <Route
            path='/about'
            element={isAuthenticated ? <About /> : <Navigate to="/" replace />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
