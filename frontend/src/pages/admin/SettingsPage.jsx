import { useEffect, useState } from 'react';
import api from '../../api/client.js';
import ProfileForm from '../../components/ProfileForm.jsx';

const SettingsPage = () => {
  const [settings, setSettings] = useState({ portalName: '', supportEmail: '', allowRegistration: true });
  const [saved, setSaved] = useState('');

  useEffect(() => {
    api.get('/settings').then((res) => setSettings(res.data));
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    const { data } = await api.put('/settings', settings);
    setSettings(data);
    setSaved('Settings saved');
  };

  return (
    <section className="content-stack">
      <section className="panel narrow">
        <h2>Settings</h2>
        <form className="form-grid" onSubmit={submit}>
          <label>Portal Name<input value={settings.portalName} onChange={(e) => setSettings({ ...settings, portalName: e.target.value })} /></label>
          <label>Support Email<input value={settings.supportEmail} onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })} /></label>
          <label className="check"><input type="checkbox" checked={settings.allowRegistration} onChange={(e) => setSettings({ ...settings, allowRegistration: e.target.checked })} /> Allow registration</label>
          <button className="primary">Save Settings</button>
          {saved && <p className="success">{saved}</p>}
        </form>
      </section>
      <ProfileForm />
    </section>
  );
};

export default SettingsPage;
