import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import './Auth.css';

const API_URL = import.meta.env.VITE_API_URL;

function ResetPassword() {
  const [searchParams]          = useSearchParams();
  const navigate                = useNavigate();
  const token                   = searchParams.get('token');

  const [password, setPassword]     = useState('');
  const [confirm, setConfirm]       = useState('');
  const [showPass, setShowPass]     = useState(false);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState('');
  const [success, setSuccess]       = useState(false);

  useEffect(() => {
    if (!token) navigate('/forgot-password', { replace: true });
  }, [token, navigate]);

  // ── Password strength ────────────────────────────────────────────
  const getStrength = (pw) => {
    if (!pw || pw.length === 0) return null;
    if (pw.length < 8) return { label: 'Too short', color: '#ef4444', pct: '20%' };
    const hasUpper  = /[A-Z]/.test(pw);
    const hasNumber = /[0-9]/.test(pw);
    const hasSymbol = /[^A-Za-z0-9]/.test(pw);
    const score     = [hasUpper, hasNumber, hasSymbol].filter(Boolean).length;
    if (score === 3) return { label: 'Strong',  color: '#22c55e', pct: '100%' };
    if (score === 2) return { label: 'Medium',  color: '#f59e0b', pct: '66%' };
    return             { label: 'Weak',    color: '#f97316', pct: '40%' };
  };
  const strength = getStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) { setError("Passwords don't match"); return; }
    if (password.length < 8)  { setError('Password must be at least 8 characters'); return; }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, new_password: password }),
      });

      const text = await response.text();
      let data = {};
      try { data = JSON.parse(text); } catch { data = { message: text }; }

      if (!response.ok) throw new Error(data.error || data.message || 'Reset failed');

      setSuccess(true);
      setTimeout(() => navigate('/login', { replace: true }), 2500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Success screen ───────────────────────────────────────────────
  if (success) {
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
          <h1 style={{ color: '#4fc3f7', marginBottom: '8px' }}>Password Updated!</h1>
          <p style={{ color: '#a0aec0', marginBottom: '32px' }}>
            Your password has been reset. Redirecting to login…
          </p>
          <Link to="/login" className="btn btn-primary" style={{ display: 'block' }}>
            Go to Login
          </Link>
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
            <Lock size={26} color="#4fc3f7" />
          </div>
          <h1>Set New Password</h1>
          <p>Choose a strong password you haven't used before</p>
        </div>

        {error && (
          <div className="message message-error"
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={16} />{error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">

          {/* New password */}
          <div className="form-group">
            <label>New Password</label>
            <div className="input-wrapper">
              <Lock size={20} className="input-icon" />
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                required
                disabled={loading}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Strength bar */}
            {strength && (
              <div style={{ marginTop: '8px' }}>
                <div style={{
                  height: '4px', background: '#1e2a3a',
                  borderRadius: '99px', overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%', width: strength.pct,
                    background: strength.color, borderRadius: '99px',
                    transition: 'width 0.3s ease, background 0.3s ease'
                  }} />
                </div>
                <p style={{ fontSize: '12px', color: strength.color, marginTop: '4px', fontWeight: 500 }}>
                  {strength.label}
                </p>
              </div>
            )}
          </div>

          {/* Confirm password */}
          <div className="form-group">
            <label>Confirm Password</label>
            <div className="input-wrapper">
              <Lock size={20} className="input-icon" />
              <input
                type={showPass ? 'text' : 'password'}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Repeat your password"
                required
                disabled={loading}
              />
            </div>
            {confirm && confirm !== password && (
              <p style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>
                Passwords don't match
              </p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading || (!!confirm && confirm !== password)}
          >
            {loading
              ? <><div className="spinner-small"></div>Updating Password…</>
              : 'Reset Password'}
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

export default ResetPassword;