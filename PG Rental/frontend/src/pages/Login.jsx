import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const firebaseUser = userCredential.user;

            login({
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                name: firebaseUser.displayName || email.split('@')[0],
            });
            navigate('/');
        } catch (err) {
            const code = err.code;
            if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
                setShowPopup(true);
                setError('Incorrect email or password. Please check your credentials or sign up first.');
            } else if (code === 'auth/invalid-email') {
                setError('Please enter a valid email address.');
            } else {
                setError('Login failed. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handlePopupClose = (goToSignup) => {
        setShowPopup(false);
        if (goToSignup) {
            navigate('/signup');
        }
    };

    return (
        <div className="auth-wrapper">
            {/* Error Popup / Modal */}
            {showPopup && (
                <div className="popup-overlay" onClick={() => setShowPopup(false)}>
                    <div className="popup-card" onClick={(e) => e.stopPropagation()}>
                        <div className="popup-icon">
                            <AlertCircle size={40} color="#EF4444" />
                        </div>
                        <h3 className="popup-title">Login Failed</h3>
                        <p className="popup-message">
                            Account not found or incorrect password. Please sign up first if you don't have an account.
                        </p>
                        <div className="popup-actions">
                            <button className="btn btn-outline" onClick={() => handlePopupClose(false)}>
                                Try Again
                            </button>
                            <button className="btn btn-primary" onClick={() => handlePopupClose(true)}>
                                Go to Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="auth-card">
                <h1 className="auth-title">Welcome Back</h1>
                <p className="auth-subtitle">Log in to view top PG properties in Nagpur</p>

                {error && !showPopup && (
                    <div style={{ color: '#EF4444', fontSize: '0.875rem', marginBottom: '1rem', textAlign: 'center', background: '#FEF2F2', padding: '0.75rem', borderRadius: '8px' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                            <input
                                type="email"
                                className="form-input"
                                style={{ paddingLeft: '2.5rem' }}
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                            <input
                                type="password"
                                className="form-input"
                                style={{ paddingLeft: '2.5rem' }}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem' }} disabled={isLoading}>
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem' }}>
                    Don't have an account? <Link to="/signup" style={{ color: 'var(--primary)', fontWeight: '600' }}>Sign up</Link>
                </p>
            </div>
        </div>
    );
};
