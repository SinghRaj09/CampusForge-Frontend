import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, FolderOpen, LogOut, ChevronDown } from 'lucide-react';
import './Header.css';

// ── CampusForge Wordmark + Tagline ─────────────────────────────────
const CampusLogo = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>

    {/* Wordmark only — no icon */}
    <span style={{
      fontFamily: "'Space Mono', monospace",
      fontWeight: 700,
      fontSize: '1.5rem',
      letterSpacing: '-0.02em',
      lineHeight: 1,
    }}>
      <span style={{ color: '#22d3ee' }}>Campus</span>
      <span style={{ color: '#e6edf3' }}>Forge</span>
    </span>

    {/* Tagline */}
    <p style={{
      margin: 0,
      fontSize: '0.94rem',
      color: 'rgb(255, 200, 0)',
      letterSpacing: '0.01em',
      lineHeight: 1.4,
      fontFamily: "'Sora', sans-serif",
      whiteSpace: 'nowrap',
    }}>
      The platform where students find projects, collaborate, and build real experience.
    </p>

  </div>
);
// ───────────────────────────────────────────────────────────────────

function Header({ user, onLogout }) {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleAddProject = () => { setShowDropdown(false); navigate('/add-project'); };
  const handleMyProjects = () => { setShowDropdown(false); navigate('/my-projects'); };
  const handleLogout     = () => { setShowDropdown(false); onLogout(); navigate('/login'); };

  return (
    <header className="header">
      <div className="header-container">

        {/* Wordmark + tagline */}
        <div className="logo" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
          <CampusLogo />
        </div>

        {/* Profile Dropdown */}
        <div className="profile-dropdown">
          <button className="profile-btn" onClick={() => setShowDropdown(!showDropdown)}>
            <div className="profile-avatar">
              {user?.full_name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <span className="profile-name">{user?.full_name || user?.email}</span>
            <ChevronDown size={16} />
          </button>

          {showDropdown && (
            <div className="dropdown-menu">
              <button className="dropdown-item" onClick={handleAddProject}>
                <Plus size={18} /><span>Add Project</span>
              </button>
              <button className="dropdown-item" onClick={handleMyProjects}>
                <FolderOpen size={18} /><span>My Projects</span>
              </button>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item logout" onClick={handleLogout}>
                <LogOut size={18} /><span>Logout</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}

export default Header;