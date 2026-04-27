import { useEffect, useState } from 'react';
import api from '../../api/client.js';
import StatCard from '../../components/StatCard.jsx';

const UserDashboard = () => {
  const [data, setData] = useState(null);
  useEffect(() => { api.get('/dashboard').then((res) => setData(res.data)); }, []);

  return (
    <section className="content-stack">
      <section className="page-intro">
        <h2>User Dashboard</h2>
      </section>
      <div className="stat-grid">
        <StatCard label="Assigned Projects" value={data?.summary?.assignedProjects} />
        <StatCard label="Completed" value={data?.summary?.completed} />
      </div>
      <section className="panel">
        <h2>Limited Summary</h2>
        <div className="project-grid">
          {data?.assignedProjects?.map((project) => (
            <article className="project-card" key={project._id}>
              <span>{project.status}</span>
              <h3>{project.title}</h3>
              <p>{project.client?.companyName}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
};

export default UserDashboard;
