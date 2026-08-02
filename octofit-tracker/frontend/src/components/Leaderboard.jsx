import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function loadLeaderboard() {
      try {
        const data = await fetchCollection('leaderboard');
        if (!ignore) {
          setLeaderboard(data);
        }
      } catch (fetchError) {
        if (!ignore) {
          setError(fetchError.message || 'Unable to load leaderboard');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadLeaderboard();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <p className="text-uppercase text-primary fw-semibold mb-1">Leaderboard</p>
            <h2 className="h4 mb-0">Top performers</h2>
          </div>
        </div>
        {loading && <p className="text-muted">Loading leaderboard…</p>}
        {error && <div className="alert alert-danger">{error}</div>}
        {!loading && !error && (
          <div className="list-group">
            {leaderboard.map((entry, index) => (
              <div key={entry._id || entry.id || `${entry.name}-${index}`} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="h6 mb-1">#{index + 1} {entry.name}</h3>
                  <p className="mb-0 text-muted">{entry.activityCount || 0} activities logged</p>
                </div>
                <span className="badge text-bg-primary">{entry.score || 0}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
