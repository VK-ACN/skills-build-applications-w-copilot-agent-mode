import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function loadTeams() {
      try {
        const data = await fetchCollection('teams');
        if (!ignore) {
          setTeams(data);
        }
      } catch (fetchError) {
        if (!ignore) {
          setError(fetchError.message || 'Unable to load teams');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadTeams();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <p className="text-uppercase text-primary fw-semibold mb-1">Teams</p>
            <h2 className="h4 mb-0">Competition groups</h2>
          </div>
        </div>
        {loading && <p className="text-muted">Loading teams…</p>}
        {error && <div className="alert alert-danger">{error}</div>}
        {!loading && !error && (
          <div className="list-group">
            {teams.map((team) => (
              <div key={team._id || team.id || team.name} className="list-group-item">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h3 className="h6 mb-1">{team.name}</h3>
                    <p className="mb-1 text-muted">{team.members?.length || 0} members</p>
                    <span className="badge text-bg-light">Score: {team.score || 0}</span>
                  </div>
                  <small className="text-muted">{new Date(team.createdAt || Date.now()).toLocaleDateString()}</small>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
