import { useEffect, useState } from 'react';
import UserCard from './components/UserCard';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    const controller = new AbortController();
  
    (async () => {
      try {
        const res = await fetch('https://dummyjson.com/users', { signal: controller.signal });
        console.log("controller.signal", controller.signal);
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
        const data = await res.json();
        console.log("data", data);
        // data.users.map((user) => {
        //   return {
        //     ...user,
        //     name: user.firstName + ' ' + user.lastName
        //   }
        // })
        setUsers(Array.isArray(data?.users) ? data.users : []);
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    })();
  
    return () => controller.abort();
  }, []);
  
  async function createUser(user) {
    const res = await fetch('https://dummyjson.com/users/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    if (!res.ok) throw new Error(`Create failed with status ${res.status}`);
    return res.json();
  }

  async function updateUser(userId, patch) {
    const res = await fetch(`https://dummyjson.com/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch)
    });
    if (!res.ok) throw new Error(`Update failed with status ${res.status}`);
    return res.json();
  }

  async function deleteUser(userId) {
    const res = await fetch(`https://dummyjson.com/users/${userId}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error(`Delete failed with status ${res.status}`);
    return res.json();
  }

  async function handleCreate(e) {
    e.preventDefault();
    try {
      const created = await createUser({ firstName, lastName });
      setUsers((prev) => [created, ...prev]);
      setFirstName("");
      setLastName("");
    } catch (err) {
      setError(err.message || 'Failed to create user');
    }
  }

  async function handleUpdate(user) {
    try {
      const updated = await updateUser(user.id, { lastName: `${user.lastName} (Updated)` });
      setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, ...updated } : u)));
    } catch (err) {
      setError(err.message || 'Failed to update user');
    }
  }

  async function handleDelete(userId) {
    try {
      await deleteUser(userId);
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch (err) {
      setError(err.message || 'Failed to delete user');
    }
  }
  return (
    <div>
      <main style={{ padding: 16, maxWidth: 800, margin: '0 auto', textAlign: 'left' }}>
        <h2>User Data Fetch Using useEffect and useState hooks</h2>
        <form onSubmit={handleCreate} style={{ margin: '16px 0', display: 'flex', gap: 8 }}>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name"
          />
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last name"
          />
          <button type="submit">Create (POST)</button>
        </form>
        {loading && <p>Loading users…</p>}
        {!loading && error && (
          <p role="alert" style={{ color: 'salmon' }}>Failed to load users: {error}</p>
        )}
        {!loading && !error && users.length === 0 && <p>No users found.</p>}
        {!loading && !error && users.length > 0 && (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {users.map((u) => (
              <UserCard key={u.id} user={u} onUpdate={handleUpdate} onDelete={handleDelete} />
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

export default App;
