export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
}

export async function fetchUsers() {
  const baseUrl = getApiBaseUrl();
  const response = await fetch(`${baseUrl}/api/users`);
  return response.json();
}

export async function fetchActivities() {
  const baseUrl = getApiBaseUrl();
  const response = await fetch(`${baseUrl}/api/activities`);
  return response.json();
}
