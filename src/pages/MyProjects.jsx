import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import ProjectCard from '../components/ProjectCard';
import EditProjectModal from '../components/EditProjectModal';
import './MyProjects.css';
import { request } from '../api';


function MyProjects({ user, onLogout }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    fetchMyProjects();
  }, []);

  const fetchMyProjects = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await request('/my_projects');
      setProjects(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setSuccess('');
    setError('');
  };

  const handleSave = async (updatedProject) => {
    try {
      await request('/edit_project', 'PUT', {
        id: updatedProject.id,
        title: updatedProject.title,
        description: updatedProject.description,
        skills: updatedProject.skills,
        contact_name: updatedProject.contact_name,
        contact_email: updatedProject.contact_email,
        category: updatedProject.category || [],
        contact_no: parseInt(updatedProject.contact_no) || 0,
        team_size: parseInt(updatedProject.team_size) || 0,
        status: updatedProject.status,
      });

      setEditingProject(null);
      setSuccess('Project updated successfully!');
      fetchMyProjects();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      throw err;
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      setError('');
      await request('/delete_project', 'DELETE', { id });
      setSuccess('Project deleted successfully!');
      setProjects(prev => prev.filter(p => p.id !== id));
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="my-projects">
      <Header user={user} onLogout={onLogout} />

      <main className="my-projects-main">
        <div className="my-projects-header">
          <h2>My Projects</h2>
          <p>Manage your posted projects</p>
        </div>

        {error && <div className="message message-error">{error}</div>}
        {success && <div className="message message-success">{success}</div>}

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading your projects...</p>
          </div>
        ) : projects.length > 0 ? (
          <div className="projects-grid">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                isOwner={true}
                onEdit={handleEdit}
                onDelete={handleDelete}
                cardIndex={index}
              />
            ))}
          </div>
        ) : (
          <div className="no-projects">
            <p>You haven't posted any projects yet</p>
            <p className="subtitle">Head to the dashboard and click "Add Project" to get started!</p>
          </div>
        )}
      </main>

      {editingProject && (
        <EditProjectModal
          project={editingProject}
          onSave={handleSave}
          onClose={() => setEditingProject(null)}
        />
      )}
    </div>
  );
}

export default MyProjects;