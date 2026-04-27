import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Layout from './components/Layout.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import UserManagement from './pages/admin/UserManagement.jsx';
import ClientManagement from './pages/admin/ClientManagement.jsx';
import Reports from './pages/admin/Reports.jsx';
import SettingsPage from './pages/admin/SettingsPage.jsx';
import ClientDashboard from './pages/client/ClientDashboard.jsx';
import ClientProjects from './pages/client/ClientProjects.jsx';
import ClientProfile from './pages/client/ClientProfile.jsx';
import UserDashboard from './pages/user/UserDashboard.jsx';
import UserProfile from './pages/user/UserProfile.jsx';

const App = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/login" replace />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    <Route element={<ProtectedRoute roles={['admin']} />}>
      <Route element={<Layout />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/clients" element={<ClientManagement />} />
        <Route path="/admin/reports" element={<Reports />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
      </Route>
    </Route>

    <Route element={<ProtectedRoute roles={['client']} />}>
      <Route element={<Layout />}>
        <Route path="/client" element={<ClientDashboard />} />
        <Route path="/client/profile" element={<ClientProfile />} />
        <Route path="/client/projects" element={<ClientProjects />} />
      </Route>
    </Route>

    <Route element={<ProtectedRoute roles={['user']} />}>
      <Route element={<Layout />}>
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/user/profile" element={<UserProfile />} />
      </Route>
    </Route>
  </Routes>
);

export default App;
