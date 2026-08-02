export function getApiBaseUrl() {
  const codespaceName =
    import.meta.env.VITE_CODESPACE_NAME || import.meta.env.CODESPACE_NAME;

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;

    if (hostname.includes('app.github.dev')) {
      const backendHostname = hostname.replace(/-5173(?=\.)/, '-8000');
      return `https://${backendHostname}`;
    }
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
