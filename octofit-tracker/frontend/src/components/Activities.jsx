import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function loadActivities() {
      try {
        const data = await fetchCollection('activities');
        if (!ignore) {
          setActivities(data);
        }
      } catch (fetchError) {
        if (!ignore) {
          setError(fetchError.message || 'Unable to load activities');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadActivities();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <p className="text-uppercase text-primary fw-semibold mb-1">Activities</p>
            <h2 className="h4 mb-0">Recent activity</h2>
          </div>
        </div>
        {loading && <p className="text-muted">Loading activities…</p>}
        {error && <div className="alert alert-danger">{error}</div>}
        {!loading && !error && (
          <div className="list-group">
            {activities.map((activity) => (
              <div key={activity._id || activity.id || `${activity.type}-${activity.createdAt}`} className="list-group-item">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h3 className="h6 mb-1">{activity.type}</h3>
                    <p className="mb-1 text-muted">{activity.note || 'No note provided'}</p>
                    <span className="badge text-bg-light">{activity.durationMinutes} mins</span>
                  </div>
                  <small className="text-muted">{new Date(activity.createdAt || Date.now()).toLocaleDateString()}</small>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
