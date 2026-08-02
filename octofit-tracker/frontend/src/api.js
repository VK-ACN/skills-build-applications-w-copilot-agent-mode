function normalizeCollectionPayload(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.results)) {
    return payload.results;
  }

  if (payload && Array.isArray(payload.items)) {
    return payload.items;
  }

  if (payload && Array.isArray(payload.data)) {
    return payload.data;
  }

  return [];
}

export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME || import.meta.env.CODESPACE_NAME;

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

export async function fetchCollection(resource) {
  const response = await fetch(`${getApiBaseUrl()}/api/${resource}`);

  if (!response.ok) {
    throw new Error(`Failed to load ${resource}`);
  }

  const payload = await response.json();
  return normalizeCollectionPayload(payload);
}
