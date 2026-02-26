import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import './Auth.css';
import { request } from '../api';


function SignUp({ onLogin }) {
  const navigate = useNavigate();
  const [fullName, setFullName]               = useState('');
  const [email, setEmail]                     = useState('');
  const [password, setPassword]               = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword]       = useState(false);
  const [showConfirm, setShowConfirm]         = useState(false);
  const [loading, setLoading]                 = useState(false);
  const [error, setError]                     = useState('');
  const [done, setDone]                       = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) { setError('Passwords do not match'); return; }
    if (password.length < 6)          { setError('Password must be at least 6 characters'); return; }

    setLoading(true);
    try {
      await request('/signup', 'POST', {
        full_name: fullName,
        email,
        password
      });

      setDone(true);
    } catch (err) {
      setError(err.message);
    }
  };

  /* ── Verify email screen ─────────────────────────────── */
  if (done) {
    return (
      <div className="auth-content">
        <div className="verify-wrap">
          <div className="verify-icon">
            <CheckCircle2 size={32} color="#c084fc" />
          </div>
          <h2 className="verify-title">Almost there!</h2>
          <p className="verify-sub">We sent a verification email to</p>
          <p className="verify-email">{email}</p>
          <p className="verify-note">
            Click the link in that email to activate your account.
            <br />Check your spam folder if you don't see it.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="btn btn-primary"
          >
            Go to Login
          </button>
          <p style={{ marginTop: 16, fontSize: 13, color: 'rgba(255,255,255,0.25)' }}>
            Wrong email?{' '}
            <button className="back-link-btn" onClick={() => setDone(false)}>
              Go back and fix it
            </button>
          </p>
        </div>
      </div>
    );
  }

  /* ── Signup form ─────────────────────────────────────── */
  return (
    <div className="auth-content">
      <div className="auth-header">
        <h1>Create account</h1>
        <p>Join CampusForge and start sharing your work</p>
      </div>

      {error && <div className="message message-error">{error}</div>}

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label>Full Name</label>
          <div className="input-wrapper">
            <User size={17} className="input-icon" />
            <input
              type="text"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder="Full name"
              required
            />
          </div>
        </div>

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
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              className="toggle-password"
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <div className="input-wrapper">
            <Lock size={17} className="input-icon" />
            <input
              type={showConfirm ? 'text' : 'password'}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirm(v => !v)}
              className="toggle-password"
            >
              {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading
            ? <><div className="spinner-small" />Creating account...</>
            : 'Sign Up'}
        </button>
      </form>

      <div className="auth-footer">
        <p>Already have an account? <Link to="/login">Sign In</Link></p>
      </div>
    </div>
  );
}

export default SignUp;