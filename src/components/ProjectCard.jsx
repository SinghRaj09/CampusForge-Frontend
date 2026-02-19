import React, { useState } from 'react';
import { PROJECT_CATEGORIES } from '../pages/categories';
import './ProjectCard.css';

function ProjectCard({ project, onEdit, onDelete, isOwner, cardIndex }) {
  const [overlay, setOverlay] = useState(null); // 'desc' | 'contact' | null

  const isYellow = cardIndex % 2 === 0;

  const skills = typeof project.skills === 'string'
    ? project.skills.split(',').map(s => s.trim()).filter(Boolean)
    : (Array.isArray(project.skills) ? project.skills : []);

  const categoryValues = Array.isArray(project.category)
    ? project.category
    : (project.category ? [project.category] : []);

  const categoryLabels = categoryValues
    .map(v => PROJECT_CATEGORIES.find(c => c.value === v)?.label)
    .filter(Boolean);

  return (
    <>
      {/* ── CARD ── */}
      <div className={`project-card ${isYellow ? 'card-yellow' : 'card-purple'}`}>
        <div className="card-top">
          <span className={`status-badge status-${project.status}`}>{project.status}</span>
          <h3 className="card-title">{project.title}</h3>

          {categoryLabels.length > 0 && (
            <div className="category-badges">
              {categoryLabels.map((label, i) => (
                <span key={i} className="category-badge">{label}</span>
              ))}
            </div>
          )}
        </div>

        <div className="card-divider" />

        {skills.length > 0 && (
          <div className="card-skills">
            <div className="section-label">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3H8"/></svg>
              Required Skills
            </div>
            <div className="skills-list">
              {skills.map((skill, i) => (
                <span key={i} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        )}

        <div className="card-actions">
          <button
            className={`btn ${isYellow ? 'btn-read-yellow' : 'btn-read-purple'}`}
            onClick={() => setOverlay('desc')}
          >
            Read Description
          </button>
          <button className="btn btn-contact" onClick={() => setOverlay('contact')}>
            Contact Info
          </button>
        </div>

        {isOwner && (
          <div className="card-owner-actions">
            <button className="btn btn-edit" onClick={() => onEdit(project)}>Edit</button>
            <button className="btn btn-delete" onClick={() => onDelete(project.id)}>Delete</button>
          </div>
        )}
      </div>

      {/* ── OVERLAYS ── */}
      {overlay && (
        <div className="overlay-backdrop active" onClick={() => setOverlay(null)}>
          <div className="overlay-card" onClick={e => e.stopPropagation()}>
            <button className="overlay-close" onClick={() => setOverlay(null)}>✕</button>

            {overlay === 'desc' && (
              <>
                <div className="overlay-title">{project.title}</div>
                <div className="overlay-body">{project.description}</div>
                <div className="card-divider" style={{ margin: '0 0 18px' }} />
                <div className="overlay-actions">
                  <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setOverlay('contact')}>
                    Contact Info
                  </button>
                </div>
              </>
            )}

            {overlay === 'contact' && (
              <>
                <div className="overlay-title">Contact Information</div>

                {project.contact_name && (
                  <div className="contact-row">
                    <span className="contact-label">Name</span>
                    <span className="contact-val name">{project.contact_name}</span>
                  </div>
                )}
                {project.contact_email && (
                  <div className="contact-row">
                    <span className="contact-label">Email</span>
                    <a className="contact-val" href={`mailto:${project.contact_email}`}>
                      {project.contact_email}
                    </a>
                  </div>
                )}
                {console.log('contact_no:', project.contact_no, typeof project.contact_no)}
                {project.contact_no && Number(project.contact_no) !== 0 && (
                  <div className="contact-row">
                    <span className="contact-label">Phone</span>
                    <a className="contact-val" href={`tel:${project.contact_no}`}>
                      {project.contact_no}
                    </a>
                  </div>
                )}
                {!project.contact_name && !project.contact_email && (
                  <p className="no-contact">No contact details provided</p>
                )}

                <div className="card-divider" style={{ margin: '18px 0' }} />
                <div className="overlay-actions">
                  <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => setOverlay('desc')}>
                    Read Description
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ProjectCard;