import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import './Auth.css';
import { request } from '../api';

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await request('/login', 'POST', { email, password });
      onLogin({ email: data.email, full_name: data.full_name }, data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* ── LEFT: Cards Panel ── */}
      <div className="auth-left">
        <div className="auth-brand">
          <span className="brand-campus">Campus</span><span className="brand-forge">Forge</span>
        </div>
        <div className="cards-grid">
          {/* Row 1 */}
          <div className="ac ac-purple">
            <div className="dots-grid">
              {Array(15).fill(0).map((_, i) => <div key={i} className="dot" />)}
            </div>
            <p className="ac-headline">Build.<br />Connect.<br />Stand out.</p>
          </div>
          <div className="ac ac-purple ac-center">
            <div className="chart-box">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
                <polyline points="16 7 22 7 22 13"/>
              </svg>
            </div>
          </div>
          {/* Row 2 */}
          <div className="ac ac-yellow">
            <p className="ac-text">Find projects<br />that match<br />your skills</p>
          </div>
          <div className="ac ac-yellow">
            <p className="ac-text">Real projects.<br />Real resume.<br />Real impact.</p>
          </div>
          {/* Row 3 */}
          <div className="ac ac-purple">
            <div className="icon-box">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <p className="ac-text">Join a team.<br />Ship together.</p>
          </div>
          <div className="ac ac-yellow">
            <div className="icon-box">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            </div>
            <p className="ac-text">Track progress.<br />Stay consistent.</p>
          </div>
        </div>
        <p className="auth-tagline">Where campus projects come alive</p>
      </div>

      {/* ── RIGHT: Login Form ── */}
      <div className="auth-right">
        <div className="auth-content">
          <div className="auth-header">
            <h1>Welcome back</h1>
            <p>Sign in to your CampusForge account</p>
          </div>

          {error && <div className="message message-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <Mail size={17} className="input-icon" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper">
                <Lock size={17} className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <button type="button" onClick={() => setShowPassword(v => !v)} className="toggle-password">
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <><div className="spinner-small" />Signing in...</> : 'Sign In'}
            </button>
          </form>

          <div className="auth-footer">
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;