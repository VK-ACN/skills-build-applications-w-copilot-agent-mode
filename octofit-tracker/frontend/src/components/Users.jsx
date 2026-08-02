import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function loadUsers() {
      try {
        const data = await fetchCollection('users');
        if (!ignore) {
          setUsers(data);
        }
      } catch (fetchError) {
        if (!ignore) {
          setError(fetchError.message || 'Unable to load users');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadUsers();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <p className="text-uppercase text-primary fw-semibold mb-1">Users</p>
            <h2 className="h4 mb-0">Team members</h2>
          </div>
        </div>
        {loading && <p className="text-muted">Loading users…</p>}
        {error && <div className="alert alert-danger">{error}</div>}
        {!loading && !error && (
          <div className="list-group">
            {users.map((user) => (
              <div key={user._id || user.id || user.email} className="list-group-item">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h3 className="h6 mb-1">{user.name}</h3>
                    <p className="mb-1 text-muted">{user.email}</p>
                    <span className="badge text-bg-light">{user.role}</span>
                  </div>
                  <small className="text-muted">{new Date(user.createdAt || Date.now()).toLocaleDateString()}</small>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
