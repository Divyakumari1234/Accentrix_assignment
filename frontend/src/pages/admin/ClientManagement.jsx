import { useEffect, useState } from 'react';
import api from '../../api/client.js';

const empty = { companyName: '', contactName: '', email: '', phone: '', industry: '', status: 'active', owner: '' };

const ClientManagement = () => {
  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    const [clientRes, userRes] = await Promise.all([api.get('/clients'), api.get('/users')]);
    setClients(clientRes.data);
    setUsers(userRes.data);
  };

  useEffect(() => { load(); }, []);

  const submit = async (event) => {
    event.preventDefault();
    if (editing) await api.put(`/clients/${editing}`, form);
    else await api.post('/clients', form);
    setForm(empty);
    setEditing(null);
    load();
  };

  const edit = (client) => {
    setEditing(client._id);
    setForm({ companyName: client.companyName, contactName: client.contactName, email: client.email, phone: client.phone || '', industry: client.industry || '', status: client.status, owner: client.owner?._id || '' });
  };

  return (
    <section className="content-stack">
      <section className="panel">
        <h2>Client Management</h2>
        <form className="admin-form" onSubmit={submit}>
          <input placeholder="Company" value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} />
          <input placeholder="Contact" value={form.contactName} onChange={(e) => setForm({ ...form, contactName: e.target.value })} />
          <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input placeholder="Industry" value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} />
          <select value={form.owner} onChange={(e) => setForm({ ...form, owner: e.target.value })}><option value="">Owner</option>{users.map((u) => <option key={u._id} value={u._id}>{u.name}</option>)}</select>
          <button className="primary">{editing ? 'Update' : 'Add'} Client</button>
        </form>
      </section>
      <section className="panel table-wrap">
        <table><thead><tr><th>Company</th><th>Contact</th><th>Email</th><th>Owner</th><th></th></tr></thead><tbody>
          {clients.map((client) => (
            <tr key={client._id}><td>{client.companyName}</td><td>{client.contactName}</td><td>{client.email}</td><td>{client.owner?.name || '-'}</td><td><button onClick={() => edit(client)}>Edit</button><button className="danger" onClick={() => api.delete(`/clients/${client._id}`).then(load)}>Delete</button></td></tr>
          ))}
        </tbody></table>
      </section>
    </section>
  );
};

export default ClientManagement;
