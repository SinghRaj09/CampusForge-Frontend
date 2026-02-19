import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, XCircle, Loader } from 'lucide-react';
import './Auth.css';

const API_URL = import.meta.env.VITE_API_URL;

function VerifyEmail() {
  const [searchParams]      = useSearchParams();
  const token               = searchParams.get('token');
  const [status, setStatus] = useState('loading');
  const hasFetched          = useRef(false); // ← prevents double-call in Strict Mode

  useEffect(() => {
    if (!token)          { setStatus('error'); return; }
    if (hasFetched.current) return;   // already ran — skip second Strict Mode call
    hasFetched.current = true;

    fetch(`${API_URL}/verify-email?token=${encodeURIComponent(token)}`)
      .then((res) => setStatus(res.ok ? 'success' : 'error'))
      .catch(()   => setStatus('error'));
  }, [token]);

  return (
    <div className="auth-container">
      <div className="auth-content" style={{ textAlign: 'center' }}>

        {status === 'loading' && (
          <>
            <div style={{
              width: '72px', height: '72px', borderRadius: '50%',
              background: 'rgba(79,195,247,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px'
            }}>
              <Loader size={32} color="#4fc3f7"
                style={{ animation: 'spin 1s linear infinite' }} />
            </div>
            <h1>Verifying your email…</h1>
            <p style={{ color: '#a0aec0' }}>Just a moment, please.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div style={{
              width: '72px', height: '72px', borderRadius: '50%',
              background: 'rgba(79,195,247,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px'
            }}>
              <CheckCircle2 size={36} color="#4fc3f7" />
            </div>
            <h1 style={{ color: '#4fc3f7', marginBottom: '8px' }}>Email Verified!</h1>
            <p style={{ color: '#a0aec0', marginBottom: '32px' }}>
              Your account is now active. You can log in.
            </p>
            <Link to="/login" className="btn btn-primary" style={{ display: 'block' }}>
              Go to Login
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <div style={{
              width: '72px', height: '72px', borderRadius: '50%',
              background: 'rgba(239,68,68,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px'
            }}>
              <XCircle size={36} color="#f87171" />
            </div>
            <h1 style={{ color: '#f87171', marginBottom: '8px' }}>Link Invalid or Expired</h1>
            <p style={{ color: '#a0aec0', marginBottom: '32px', lineHeight: 1.6 }}>
              This verification link has expired or has already been used.<br />
              Sign up again to get a fresh one.
            </p>
            <Link to="/login" className="btn btn-primary" style={{ display: 'block' }}>
              Back to Login
            </Link>
          </>
        )}

      </div>
      <style>{`@keyframes spin { from { transform:rotate(0deg) } to { transform:rotate(360deg) } }`}</style>
    </div>
  );
}

export default VerifyEmail;