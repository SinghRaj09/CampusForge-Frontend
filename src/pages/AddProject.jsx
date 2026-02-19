import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { FORM_CATEGORIES } from './categories';
import './ProjectForm.css';
import { request } from '../api';


function AddProject({ user, onLogout }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skills: '',
    categories: [],
    contact_name: '',
    contact_email: '',
    contact_no: '',
    status: 'live',
    team_size: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
    setSuccess('');

    if (!formData.title.trim()) return setError('Title is required');
    if (!formData.description.trim()) return setError('Description is required');
    if (!formData.skills.trim()) return setError('Skills are required');
    if (formData.categories.length === 0) return setError('Select at least one category');
    if (!formData.contact_name.trim()) return setError('Contact name is required');
    if (!formData.contact_email.trim()) return setError('Contact email is required');

  setLoading(true);
  try {
    await request('/add_project', 'POST', {
      title: formData.title,
      description: formData.description,
      skills: formData.skills,
      category: formData.categories,
      contact_name: formData.contact_name,
      contact_email: formData.contact_email,
      contact_no: parseInt(formData.contact_no) || 0,
      status: formData.status,
      team_size: parseInt(formData.team_size) || 0,
    });

    setSuccess('Project added successfully!');
    setTimeout(() => navigate('/dashboard'), 1500);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

return (
    <div className="project-form-container">
      <Header user={user} onLogout={onLogout} />
      <main className="form-main">
        <div className="form-wrapper">
          <div className="form-header">
            <h2>Add New Project</h2>
            <p>Share your project with the community</p>
          </div>

          {error && <div className="message message-error">{error}</div>}
          {success && <div className="message message-success">{success}</div>}

          <form onSubmit={handleSubmit} className="project-form">
            <div className="form-group">
              <label>Project Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter project title"
              />
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your project in detail..."
              ></textarea>
            </div>

            <div className="form-group">
              <label>Required Skills *</label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="e.g., React, Node.js, MongoDB (comma-separated)"
              />
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
                <input
                  type="text"
                  name="contact_name"
                  value={formData.contact_name}
                  onChange={handleChange}
                  placeholder="Your name"
                />
              </div>
              <div className="form-group">
                <label>Contact Email *</label>
                <input
                  type="email"
                  name="contact_email"
                  value={formData.contact_email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Contact Phone <span style={{fontWeight:'normal', opacity:0.6}}>(optional)</span></label>
                <input
                  type="tel"
                  name="contact_no"
                  value={formData.contact_no}
                  onChange={handleChange}
                  placeholder="Your phone number"
                />
              </div>
              <div className="form-group">
                <label>Team Size</label>
                <input
                  type="number"
                  name="team_size"
                  value={formData.team_size}
                  onChange={handleChange}
                  placeholder="Number of members needed"
                  min="0"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Project Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="live">Live</option>
                <option value="expired">Expired</option>
              </select>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? <><div className="spinner-small"></div>Adding Project...</> : 'Add Project'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/dashboard')} disabled={loading}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default AddProject;