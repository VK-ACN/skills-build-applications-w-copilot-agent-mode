import { useEffect, useState } from 'react'
import './App.css'
import { fetchActivities, fetchUsers, getApiBaseUrl } from './api.js'

function App() {
  const [users, setUsers] = useState([])
  const [activities, setActivities] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadData() {
      try {
        const [usersData, activitiesData] = await Promise.all([fetchUsers(), fetchActivities()])
        setUsers(usersData)
        setActivities(activitiesData)
      } catch (fetchError) {
        setError(fetchError.message || 'Failed to load API data')
      }
    }

    loadData()
  }, [])

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-5">
              <p className="text-uppercase text-primary fw-semibold">OctoFit Tracker</p>
              <h1 className="display-5 fw-bold mb-3">Modern fitness tracking for teams</h1>
              <p className="lead text-muted mb-4">
                Manage workouts, monitor progress, and keep your crew motivated from one place.
              </p>
              <p className="text-muted mb-4">
                API base URL: <strong>{getApiBaseUrl()}</strong>
              </p>
              {error ? (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              ) : (
                <div className="row g-3">
                  <div className="col-sm-6">
                    <div className="p-3 bg-light rounded-3">
                      <h5 className="mb-1">Users</h5>
                      <p className="mb-0">{users.length} users loaded</p>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="p-3 bg-light rounded-3">
                      <h5 className="mb-1">Activities</h5>
                      <p className="mb-0">{activities.length} activities loaded</p>
                    </div>
                  </div>
                </div>
              )}
              <div className="d-flex gap-3 mt-4">
                <a className="btn btn-primary btn-lg" href="/">Get started</a>
                <a className="btn btn-outline-secondary btn-lg" href="/">View dashboard</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
