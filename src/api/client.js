// ─── API Base Client ──────────────────────────────────────────────────────────
// Central fetch wrapper that handles auth headers, token refresh, and errors.
//
// BASE_URL is always '' (empty string = relative URLs).
//
// In dev:        Vite's proxy (vite.config.js) forwards /api/* → localhost:5001
// In production: Netlify's [[redirects]] rule proxies /api/* → Render backend
//                server-side, so there is NO CORS issue at all.
//
// If you need to point directly at a backend (bypassing the proxy), set
// VITE_API_URL in your .env — e.g. for mobile/native testing.

const BASE_URL = import.meta.env.VITE_API_URL ?? '';

// In-memory access token (never in localStorage to avoid XSS)
let _accessToken = null;

export const setAccessToken = (token) => { _accessToken = token; };
export const getAccessToken = () => _accessToken;
export const clearAccessToken = () => { _accessToken = null; };

// ─── Core request ─────────────────────────────────────────────────────────────
async function request(path, options = {}, retry = true) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (_accessToken) {
    headers['Authorization'] = `Bearer ${_accessToken}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  // Auto-refresh on 401 TOKEN_EXPIRED
  if (res.status === 401 && retry) {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      try {
        const refreshRes = await fetch(`${BASE_URL}/api/auth/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken }),
        });

        if (refreshRes.ok) {
          const { data } = await refreshRes.json();
          setAccessToken(data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);
          // Retry original request with new token
          return request(path, options, false);
        }
      } catch (_) { /* refresh failed — fall through */ }

      // Refresh failed: clear tokens and dispatch logout event
      clearAccessToken();
      localStorage.removeItem('refreshToken');
      window.dispatchEvent(new CustomEvent('auth:logout'));
    }
  }

  // Parse body
  let body;
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    body = await res.json();
  } else {
    body = await res.text();
  }

  if (!res.ok) {
    const error = new Error(body?.message || `Request failed: ${res.status}`);
    error.status = res.status;
    error.data = body;
    throw error;
  }

  return body;
}

// ─── HTTP helpers ─────────────────────────────────────────────────────────────
export const api = {
  get:    (path, options)       => request(path, { method: 'GET',    ...options }),
  post:   (path, body, options) => request(path, { method: 'POST',   body: JSON.stringify(body), ...options }),
  put:    (path, body, options) => request(path, { method: 'PUT',    body: JSON.stringify(body), ...options }),
  patch:  (path, body, options) => request(path, { method: 'PATCH',  body: JSON.stringify(body), ...options }),
  delete: (path, options)       => request(path, { method: 'DELETE', ...options }),
};
