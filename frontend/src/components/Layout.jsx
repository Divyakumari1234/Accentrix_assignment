import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { BarChart3, BriefcaseBusiness, ClipboardList, LogOut, Settings, UserCog, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

const navByRole = {
  admin: [
    ['Dashboard', '/admin', BarChart3],
    ['Users', '/admin/users', Users],
    ['Clients', '/admin/clients', BriefcaseBusiness],
    ['Reports', '/admin/reports', ClipboardList],
    ['Settings', '/admin/settings', Settings]
  ],
  client: [
    ['Dashboard', '/client', BarChart3],
    ['Profile', '/client/profile', UserCog],
    ['Projects', '/client/projects', BriefcaseBusiness]
  ],
  user: [
    ['Dashboard', '/user', BarChart3],
    ['Profile', '/user/profile', UserCog]
  ]
};

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const nav = navByRole[user.role] || [];

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link to={`/${user.role}`} className="brand">
          <span className="brand-mark">A</span>
          <span>Accentrix Portal</span>
        </Link>
        <nav>
          {nav.map(([label, to, Icon]) => (
            <NavLink key={to} to={to} end className={({ isActive }) => (isActive ? 'active' : '')}>
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="main">
        <header className="topbar">
          <div>
            <p className="eyebrow">{user.role}</p>
            <h1>{user.name}</h1>
          </div>
          <button className="icon-button" onClick={onLogout} title="Log out" aria-label="Log out">
            <LogOut size={18} />
          </button>
        </header>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
