import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function loadWorkouts() {
      try {
        const data = await fetchCollection('workouts');
        if (!ignore) {
          setWorkouts(data);
        }
      } catch (fetchError) {
        if (!ignore) {
          setError(fetchError.message || 'Unable to load workouts');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadWorkouts();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <p className="text-uppercase text-primary fw-semibold mb-1">Workouts</p>
            <h2 className="h4 mb-0">Training plans</h2>
          </div>
        </div>
        {loading && <p className="text-muted">Loading workouts…</p>}
        {error && <div className="alert alert-danger">{error}</div>}
        {!loading && !error && (
          <div className="list-group">
            {workouts.map((workout) => (
              <div key={workout._id || workout.id || workout.title} className="list-group-item">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h3 className="h6 mb-1">{workout.title}</h3>
                    <p className="mb-1 text-muted">{workout.description}</p>
                    <span className="badge text-bg-light">{workout.category}</span>
                  </div>
                  <small className="text-muted">{workout.durationMinutes} mins</small>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
