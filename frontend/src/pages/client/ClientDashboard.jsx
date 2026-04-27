import { useEffect, useState } from 'react';
import api from '../../api/client.js';
import StatCard from '../../components/StatCard.jsx';

const ClientDashboard = () => {
  const [data, setData] = useState(null);
  useEffect(() => { api.get('/dashboard').then((res) => setData(res.data)); }, []);

  return (
    <section className="content-stack">
      <section className="page-intro">
        <h2>Client Dashboard</h2>
      </section>
      <div className="stat-grid">
        <StatCard label="Projects" value={data?.summary?.projects} />
        <StatCard label="In Progress" value={data?.summary?.inProgress} />
        <StatCard label="Completed" value={data?.summary?.completed} />
      </div>
      <section className="panel">
        <h2>Notifications</h2>
        <div className="activity-list">{data?.notifications?.map((n) => <p key={n.title}><strong>{n.title}</strong> {n.message}</p>)}</div>
      </section>
      <section className="panel">
        <h2>Project Overview</h2>
        <div className="project-grid">{data?.projects?.map((p) => <article className="project-card" key={p._id}><span>{p.status}</span><h3>{p.title}</h3><p>{p.description}</p></article>)}</div>
      </section>
    </section>
  );
};

export default ClientDashboard;
