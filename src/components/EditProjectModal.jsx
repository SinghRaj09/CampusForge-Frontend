import React, { useState } from 'react';
import { X } from 'lucide-react';
import { FORM_CATEGORIES } from '../pages/categories';
import './EditProjectModal.css';

function EditProjectModal({ project, onSave, onClose }) {
  const existingCategories = Array.isArray(project.category)
    ? project.category
    : (project.category ? [project.category] : []);

  const [formData, setFormData] = useState({
    id: project.id,
    title: project.title,
    description: project.description,
    skills: Array.isArray(project.skills) ? project.skills.join(', ') : project.skills,
    categories: existingCategories,
    contact_name: project.contact_name || '',
    contact_email: project.contact_email || '',
    contact_no: project.contact_no || '',
    status: project.status || 'live',
    team_size: project.team_size || 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleCategory = (value) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(value)
        ? prev.categories.filter(c => c !== value)
        : [...prev.categories, value],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.categories.length === 0) { setError('Select at least one category'); return; }
    if (!formData.contact_name.trim()) { setError('Contact name is required'); return; }
    if (!formData.contact_email.trim()) { setError('Contact email is required'); return; }

    setLoading(true);
    try {
      await onSave({
        ...formData,
        category: formData.categories,
        contact_no: parseInt(formData.contact_no) || 0,
        team_size: parseInt(formData.team_size) || 0,
        skills: Array.isArray(formData.skills) ? formData.skills.join(', ') : formData.skills,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Project</h2>
          <button className="close-btn" onClick={onClose}><X size={24} /></button>
        </div>

        {error && <div className="message message-error">{error}</div>}

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Project Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Enter project title" />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Describe your project..."></textarea>
          </div>

          <div className="form-group">
            <label>Required Skills</label>
            <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="React, Node.js, MongoDB" />
          </div>

          <div className="form-group">
            <label>Category * <span style={{fontWeight:'normal', opacity:0.6}}>(select all that apply)</span></label>
            <div className="category-checkboxes">
              {FORM_CATEGORIES.map(cat => (
                <label key={cat.value} className={`category-chip ${formData.categories.includes(cat.value) ? 'selected' : ''}`}>
                  <input
                    type="checkbox"
                    checked={formData.categories.includes(cat.value)}
                    onChange={() => toggleCategory(cat.value)}
                  />
                  {cat.label}
                </label>
              ))}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Contact Name *</label>
              <input type="text" name="contact_name" value={formData.contact_name} onChange={handleChange} placeholder="Contact person's name" />
            </div>
            <div className="form-group">
              <label>Contact Email *</label>
              <input type="email" name="contact_email" value={formData.contact_email} onChange={handleChange} placeholder="contact@email.com" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Contact Phone <span style={{fontWeight:'normal', opacity:0.6}}>(optional)</span></label>
              <input type="tel" name="contact_no" value={formData.contact_no} onChange={handleChange} placeholder="Phone number" />
            </div>
            <div className="form-group">
              <label>Team Size</label>
              <input type="number" name="team_size" value={formData.team_size} onChange={handleChange} min="0" />
            </div>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="live">Live</option>
              <option value="expired">Expired</option>
            </select>
          </div>

          <div className="modal-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProjectModal;