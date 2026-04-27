import { useEffect, useState } from 'react';
import api from '../../api/client.js';

const ClientProjects = () => {
  const [projects, setProjects] = useState([]);
  const load = () => api.get('/projects').then((res) => setProjects(res.data));
  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/projects/${id}`, { status });
    load();
  };

  return (
    <section className="panel">
      <h2>Client Projects</h2>
      <div className="project-grid">
        {projects.map((project) => (
          <article className="project-card" key={project._id}>
            <span>{project.status}</span>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <select value={project.status} onChange={(e) => updateStatus(project._id, e.target.value)}>
              <option value="planned">Planned</option><option value="in-progress">In Progress</option><option value="review">Review</option><option value="completed">Completed</option><option value="blocked">Blocked</option>
            </select>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ClientProjects;
