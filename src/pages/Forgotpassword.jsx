import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowRight, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import './Auth.css';

const API_URL = 'http://localhost:18080';

function ForgotPassword() {
  const [email, setEmail]         = useState('');
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate                  = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await fetch(`${API_URL}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setSubmitted(true);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ── Success screen ───────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="auth-container">
        <div className="auth-content" style={{ textAlign: 'center' }}>
          <div style={{
            width: '72px', height: '72px', borderRadius: '50%',
            background: 'rgba(79,195,247,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px'
          }}>
            <CheckCircle2 size={36} color="#4fc3f7" />
          </div>
          <h1 style={{ color: '#4fc3f7', marginBottom: '8px' }}>Check your inbox</h1>
          <p style={{ color: '#a0aec0', marginBottom: '6px' }}>We sent a reset link to</p>
          <p style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '15px', marginBottom: '24px' }}>
            {email}
          </p>
          <p style={{ color: '#718096', fontSize: '13px', marginBottom: '32px', lineHeight: 1.6 }}>
            Didn't get it? Check your spam folder.<br />Link expires in 1 hour.
          </p>
          <button onClick={() => navigate('/login')} className="btn btn-primary"
            style={{ width: '100%', marginBottom: '12px' }}>
            Back to Login
          </button>
          <button onClick={() => { setSubmitted(false); setEmail(''); }}
            style={{ background: 'none', border: 'none', color: '#4fc3f7', cursor: 'pointer', fontSize: '13px' }}>
            Try a different email
          </button>
        </div>
      </div>
    );
  }

  // ── Form ─────────────────────────────────────────────────────────
  return (
    <div className="auth-container">
      <div className="auth-content">

        <div className="auth-header">
          <div style={{
            width: '56px', height: '56px', borderRadius: '50%',
            background: 'rgba(79,195,247,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
            <Mail size={26} color="#4fc3f7" />
          </div>
          <h1>Reset Password</h1>
          <p>Enter your email to receive a reset link</p>
        </div>

        {error && (
          <div className="message message-error"
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={16} />{error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <Mail size={20} className="input-icon" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                disabled={loading}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading
              ? <><div className="spinner-small"></div>Sending Link...</>
              : <>Send Reset Link <ArrowRight size={18} style={{ marginLeft: '6px' }} /></>}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            <Link to="/login"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <ArrowLeft size={15} /> Back to Login
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default ForgotPassword;