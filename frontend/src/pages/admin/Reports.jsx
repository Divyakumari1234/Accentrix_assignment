import { useEffect, useState } from 'react';
import api from '../../api/client.js';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [filters, setFilters] = useState({ startDate: '', endDate: '' });

  const params = () => Object.fromEntries(Object.entries(filters).filter(([, value]) => value));
  const load = () => api.get('/reports', { params: params() }).then((res) => setReports(res.data));

  useEffect(() => { load(); }, []);

  const exportCsv = async () => {
    const { data } = await api.get('/reports/export', { params: params(), responseType: 'blob' });
    const url = URL.createObjectURL(data);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reports.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="panel">
      <div className="section-head"><h2>Reports</h2><button onClick={exportCsv}>Export CSV</button></div>
      <div className="filters">
        <input type="date" value={filters.startDate} onChange={(e) => setFilters({ ...filters, startDate: e.target.value })} />
        <input type="date" value={filters.endDate} onChange={(e) => setFilters({ ...filters, endDate: e.target.value })} />
        <button className="primary" onClick={load}>Filter</button>
      </div>
      <div className="report-grid">
        {reports.map((report) => (
          <article className="report-card" key={report._id}>
            <span>{report.type}</span>
            <h3>{report.title}</h3>
            <strong>{report.value}</strong>
            <p>{report.notes}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Reports;
