import { useEffect, useState } from 'react';
import api from '../../api/client.js';
import StatCard from '../../components/StatCard.jsx';

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    api.get('/dashboard').then((res) => setData(res.data));
  }, []);

  return (
    <section className="content-stack">
      <section className="page-intro">
        <h2>Admin Dashboard</h2>
      </section>
      <div className="stat-grid">
        <StatCard label="Total Users" value={data?.stats?.totalUsers} />
        <StatCard label="Total Clients" value={data?.stats?.totalClients} />
        <StatCard label="Projects" value={data?.stats?.totalProjects} />
        <StatCard label="Completed" value={data?.stats?.completedProjects} />
      </div>
      <section className="panel">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          {data?.recentActivity?.map((item) => (
            <p key={item._id}><strong>{item.actor?.name || 'System'}</strong> {item.action}</p>
          ))}
        </div>
      </section>
    </section>
  );
};

export default AdminDashboard;
