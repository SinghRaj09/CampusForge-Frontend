import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import ProjectCard from '../components/ProjectCard';
import { PROJECT_CATEGORIES } from './categories';
import './Dashboard.css';

const API_URL = 'http://localhost:18080';

function Dashboard({ user, onLogout }) {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'live' | 'expired'
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const chipsRef = useRef(null);

  const projectsPerPage = 12;

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    applyFilters(projects, searchTerm, activeCategory, statusFilter);
  }, [searchTerm, activeCategory, statusFilter, projects]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/projects`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to fetch projects');
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (allProjects, term, category, status) => {
    let filtered = allProjects;

    if (category !== 'all') {
      filtered = filtered.filter(p =>
        Array.isArray(p.category)
          ? p.category.includes(category)
          : p.category === category
      );
    }

    if (status !== 'all') {
      filtered = filtered.filter(p => p.status === status);
    }

    if (term.trim()) {
      const lower = term.toLowerCase();
      filtered = filtered.filter(p =>
        p.title?.toLowerCase().includes(lower) ||
        p.description?.toLowerCase().includes(lower) ||
        (Array.isArray(p.skills)
          ? p.skills.some(s => s.toLowerCase().includes(lower))
          : p.skills?.toLowerCase().includes(lower))
      );
    }

    setFilteredProjects(filtered);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const currentProjects = filteredProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  const countByCategory = (value) =>
    value === 'all'
      ? projects.length
      : projects.filter(p =>
          Array.isArray(p.category)
            ? p.category.includes(value)
            : p.category === value
        ).length;

  const scrollChips = (dir) => {
    if (chipsRef.current) {
      chipsRef.current.scrollBy({ left: dir * 160, behavior: 'smooth' });
    }
  };

  return (
    <div className="dashboard">
      <Header user={user} onLogout={onLogout} />

      {/* ── Mobile/tablet chip strip ── */}
      <div className="mobile-categories">
        <button className="chip-arrow" onClick={() => scrollChips(-1)}>
          <ChevronLeft size={14} />
        </button>
        <div className="chips-scroll" ref={chipsRef}>
          {PROJECT_CATEGORIES.map(cat => (
            <button
              key={cat.value}
              className={`chip ${activeCategory === cat.value ? 'chip-active' : ''}`}
              onClick={() => setActiveCategory(cat.value)}
            >
              {cat.label}
              <span className="chip-badge">{countByCategory(cat.value)}</span>
            </button>
          ))}
        </div>
        <button className="chip-arrow" onClick={() => scrollChips(1)}>
          <ChevronRight size={14} />
        </button>
      </div>

      <div className="dashboard-body">
        {/* ── Sidebar (desktop only) ── */}
        <aside className="sidebar">
          <h3 className="sidebar-title">Categories</h3>
          <ul className="sidebar-list">
            <li>
              <button
                className={`sidebar-item ${activeCategory === 'all' ? 'active' : ''}`}
                onClick={() => setActiveCategory('all')}
              >
                <span className="sidebar-label">All Projects</span>
                <span className="sidebar-count">{countByCategory('all')}</span>
              </button>
            </li>
            {PROJECT_CATEGORIES.filter(c => c.value !== 'all').map(cat => (
              <li key={cat.value}>
                <button
                  className={`sidebar-item ${activeCategory === cat.value ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.value)}
                >
                  <span className="sidebar-label">{cat.label}</span>
                  <span className="sidebar-count">{countByCategory(cat.value)}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* ── Main Content ── */}
        <main className="dashboard-main">
          <div className="search-section">
            <div className="search-container">
              <div className="search-input-wrapper">
                <Search size={20} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search projects by title, description, or skills..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>

              {/* ── Status Filter ── */}
              <div className="status-filter">
                {['all', 'live', 'expired'].map(s => (
                  <button
                    key={s}
                    className={`status-filter-btn ${statusFilter === s ? 'active' : ''} ${s !== 'all' ? `filter-${s}` : ''}`}
                    onClick={() => setStatusFilter(s)}
                  >
                    {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {error && <div className="message message-error">{error}</div>}

          <div className="projects-section">
            {loading ? (
              <div className="loading">
                <div className="spinner"></div>
                <p>Loading projects...</p>
              </div>
            ) : currentProjects.length > 0 ? (
              <>
                <div className="projects-grid">
                  {currentProjects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      isOwner={false}
                      cardIndex={index}
                    />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="pagination">
                    <button
                      className="pagination-btn"
                      onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      ← Previous
                    </button>
                    <div className="pagination-info">
                      Page {currentPage} of {totalPages} ({filteredProjects.length} projects)
                    </div>
                    <button
                      className="pagination-btn"
                      onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      Next →
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="no-projects">
                <p>No projects found</p>
                <p className="subtitle">
                  {searchTerm || activeCategory !== 'all' || statusFilter !== 'all'
                    ? 'Try different search terms, categories, or status filters'
                    : 'Be the first to add a project!'}
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;