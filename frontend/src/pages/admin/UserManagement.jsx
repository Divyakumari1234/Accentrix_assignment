import { useEffect, useState } from 'react';
import api from '../../api/client.js';

const empty = { name: '', email: '', password: '', role: 'user', phone: '', status: 'active', client: '' };

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    const [userRes, clientRes] = await Promise.all([api.get('/users'), api.get('/clients')]);
    setUsers(userRes.data);
    setClients(clientRes.data);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    const payload = { ...form };
    if (!payload.password) delete payload.password;
    if (editing) await api.put(`/users/${editing}`, payload);
    else await api.post('/users', payload);
    setForm(empty);
    setEditing(null);
    load();
  };

  const edit = (user) => {
    setEditing(user._id);
    setForm({ name: user.name, email: user.email, password: '', role: user.role, phone: user.phone || '', status: user.status, client: user.client?._id || '' });
  };

  return (
    <section className="content-stack">
      <section className="panel">
        <h2>User Management</h2>
        <form className="admin-form" onSubmit={submit}>
          <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}><option value="admin">Admin</option><option value="client">Client</option><option value="user">User</option></select>
          <select value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })}><option value="">No client</option>{clients.map((c) => <option key={c._id} value={c._id}>{c.companyName}</option>)}</select>
          <button className="primary">{editing ? 'Update' : 'Create'} User</button>
        </form>
      </section>
      <section className="panel table-wrap">
        <table><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Client</th><th></th></tr></thead><tbody>
          {users.map((user) => (
            <tr key={user._id}><td>{user.name}</td><td>{user.email}</td><td>{user.role}</td><td>{user.client?.companyName || '-'}</td><td><button onClick={() => edit(user)}>Edit</button><button className="danger" onClick={() => api.delete(`/users/${user._id}`).then(load)}>Delete</button></td></tr>
          ))}
        </tbody></table>
      </section>
    </section>
  );
};

export default UserManagement;
