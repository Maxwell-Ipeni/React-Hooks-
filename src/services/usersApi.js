const BASE_URL = 'https://dummyjson.com/users';

export async function fetchUsers(signal) {
  const response = await fetch(BASE_URL, { signal });
  if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
  const data = await response.json();
  return data?.users;
}

export async function createUser(user) {
  const response = await fetch(`${BASE_URL}/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
  if (!response.ok) throw new Error(`Create failed with status ${response.status}`);
  return response.json();
}

export async function updateUser(userId, patch) {
  const response = await fetch(`${BASE_URL}/${userId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patch)
  });
  if (!response.ok) {
    let apiMessage = '';
    try {
      const payload = await response.json();
      apiMessage = payload?.message || payload?.error || '';
    } catch (_) {
      try {
        apiMessage = await response.text();
      } catch (_) {
        apiMessage = '';
      }
    }
    const suffix = apiMessage ? `: ${apiMessage}` : '';
    throw new Error(`Update failed with status ${response.status}${suffix}`);
  }
  return response.json();
}

export async function deleteUser(userId) {
  const response = await fetch(`${BASE_URL}/${userId}`, { method: 'DELETE' });
  if (!response.ok) throw new Error(`Delete failed with status ${response.status}`);
  return response.json();
}


