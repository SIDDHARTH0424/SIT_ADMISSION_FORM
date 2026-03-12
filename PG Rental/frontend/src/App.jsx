import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Help } from './pages/Help';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { AuthContext, AuthProvider } from './context/AuthContext';
import { LogOut, Home as HomeIcon, Building2, Info, HelpCircle, Search } from 'lucide-react';
import './index.css';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div className="loading-spinner"></div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="logo">
          <Building2 size={26} color="var(--primary)" />
          <span>PG Rental Hub</span>
        </Link>

        {user && (
          <div className="nav-center">
            <Link to="/" className="nav-link">
              <HomeIcon size={16} /> Home
            </Link>
            <Link to="/#properties" className="nav-link">
              <Search size={16} /> Properties
            </Link>
            <Link to="/about" className="nav-link">
              <Info size={16} /> About
            </Link>
            <Link to="/help" className="nav-link">
              <HelpCircle size={16} /> Help
            </Link>
          </div>
        )}

        <div className="nav-links">
          {user ? (
            <>
              <span className="nav-welcome">Hi, {user.name}</span>
              <button className="btn btn-outline" onClick={logout}>
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">Login</Link>
              <Link to="/signup" className="btn btn-primary">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/about"
              element={
                <ProtectedRoute>
                  <About />
                </ProtectedRoute>
              }
            />
            <Route
              path="/help"
              element={
                <ProtectedRoute>
                  <Help />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </AuthProvider>
    </Router>
  );
}

export default App;
