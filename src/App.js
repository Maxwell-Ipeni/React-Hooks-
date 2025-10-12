import { useEffect, useState } from 'react';
import UserCard from './components/UserCard';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  return (
    <div>
      <main style={{ padding: 16, maxWidth: 800, margin: '0 auto', textAlign: 'left' }}>
        <h2>User Data Fetch Using useEffect and useState hooks</h2>
        {loading && <p>Loading users…</p>}
        {!loading && error && (
          <p role="alert" style={{ color: 'salmon' }}>Failed to load users: {error}</p>
        )}
        {!loading && !error && users.length === 0 && <p>No users found.</p>}
        {!loading && !error && users.length > 0 && (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {users.map((u) => (
              <UserCard key={u.id} user={u} />
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

export default App;
