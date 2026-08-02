import { NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import { getApiBaseUrl } from './api.js';

const navItems = [
  { path: '/', label: 'Overview' },
  { path: '/users', label: 'Users' },
  { path: '/activities', label: 'Activities' },
  { path: '/teams', label: 'Teams' },
  { path: '/workouts', label: 'Workouts' },
  { path: '/leaderboard', label: 'Leaderboard' },
];

function App() {
  return (
    <main className="container py-4 py-lg-5">
      <div className="card shadow-sm border-0">
        <div className="card-body p-4 p-lg-5">
          <p className="text-uppercase text-primary fw-semibold mb-2">OctoFit Tracker</p>
          <h1 className="display-6 fw-bold mb-3">Modern fitness tracking for teams</h1>
          <p className="lead text-muted mb-4">
            Explore members, activities, team performance, and workout plans from one React 19 dashboard.
          </p>
          <div className="alert alert-light border mb-4">
            <strong>API base URL:</strong> {getApiBaseUrl()}
            <div className="small text-muted mt-1">
              Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> for Codespaces deployments.
            </div>
          </div>
          <nav className="nav nav-pills flex-wrap gap-2 mb-4">
            {navItems.map((item) => (
              <NavLink key={item.path} to={item.path} className={({ isActive }) => `nav-link ${isActive ? 'active' : 'text-secondary'}`}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/users" element={<Users />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </div>
      </div>
    </main>
  );
}

function Overview() {
  return (
    <div className="row g-3">
      <div className="col-md-6 col-xl-4">
        <div className="p-3 bg-light rounded-3 h-100">
          <h2 className="h5">Users</h2>
          <p className="text-muted mb-0">See the people powering each team.</p>
        </div>
      </div>
      <div className="col-md-6 col-xl-4">
        <div className="p-3 bg-light rounded-3 h-100">
          <h2 className="h5">Activities</h2>
          <p className="text-muted mb-0">Track the latest training progress.</p>
        </div>
      </div>
      <div className="col-md-6 col-xl-4">
        <div className="p-3 bg-light rounded-3 h-100">
          <h2 className="h5">Leaderboard</h2>
          <p className="text-muted mb-0">Celebrate the top performers.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
