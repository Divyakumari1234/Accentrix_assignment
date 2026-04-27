import { useState } from 'react';
import api from '../api/client.js';
import { useAuth } from '../context/AuthContext.jsx';

const ProfileForm = ({ title = 'Profile Page', description }) => {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({ name: user.name, phone: user.phone || '', currentPassword: '', newPassword: '' });
  const [avatar, setAvatar] = useState(null);
  const [message, setMessage] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => value && payload.append(key, value));
    if (avatar) payload.append('avatar', avatar);
    const { data } = await api.put('/users/profile', payload);
    updateUser(data);
    setMessage('Profile updated');
    setForm((current) => ({ ...current, currentPassword: '', newPassword: '' }));
  };

  return (
    <section className="panel narrow">
      <h2>{title}</h2>
      {description && <p className="requirement-line">{description}</p>}
      <form className="form-grid" onSubmit={submit}>
        <label>Name<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
        <label>Phone<input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></label>
        <label>Profile Image<input type="file" accept="image/*" onChange={(e) => setAvatar(e.target.files[0])} /></label>
        <label>Current Password<input type="password" value={form.currentPassword} onChange={(e) => setForm({ ...form, currentPassword: e.target.value })} /></label>
        <label>New Password<input type="password" value={form.newPassword} onChange={(e) => setForm({ ...form, newPassword: e.target.value })} /></label>
        <button className="primary">Save Profile</button>
        {message && <p className="success">{message}</p>}
      </form>
    </section>
  );
};

export default ProfileForm;
