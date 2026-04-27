import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: 'admin@accentrix.local', password: 'Admin@123' });
  const [error, setError] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const user = await login(form.email, form.password);
      navigate(`/${user.role}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>Accentrix Project Portal</h1>
        <p>Secure dashboards for admins, clients, and users.</p>
        <form onSubmit={submit} className="form-grid">
          <label>Email<input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
          <label>Password<input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
          <button className="primary">Log In</button>
          {error && <p className="error">{error}</p>}
        </form>
        <div className="demo-box">
          <strong>Demo credentials</strong>
          <span>Admin: admin@accentrix.local / Admin@123</span>
          <span>Client: client@accentrix.local / Client@123</span>
          <span>User: user@accentrix.local / User@123</span>
        </div>
        <Link to="/register">Create a user account</Link>
      </section>
    </main>
  );
};

export default Login;
