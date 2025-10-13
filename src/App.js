import { useEffect, useState } from 'react';
import './App.css';
import UserCard from './components/UserCard';
import UserForm from './components/UserForm.jsx';
import { fetchUsers, createUser as apiCreateUser, updateUser as apiUpdateUser, deleteUser as apiDeleteUser } from './services/usersApi';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [age, setAge] = useState("");
  useEffect(() => {
    const controller = new AbortController();
  
    (async () => {
      try {
        const list = await fetchUsers(controller.signal);
        setUsers(list);
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    })();
  
    return () => controller.abort();
  }, []);
  
  // API helpers are in services/usersApi.js

  async function handleCreate(e) {
    e.preventDefault();
    try {
      const created = await apiCreateUser({ firstName, lastName, weight, height, birthDate, age });
      setUsers((prev) => [created, ...prev]);
      setFirstName("");
      setLastName("");
      setWeight("");
      setHeight("");
      setBirthDate("");
      setAge("");
    } catch (err) {
      setError(err.message || 'Failed to create user');
    }
  }

  async function handleUpdate(user) {
    try {
      const updated = await apiUpdateUser(user.id, { lastName: `${user.lastName} (Updated)` });
      setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, ...updated } : u)));
    } catch (err) {
      setError(err.message || 'Failed to update user');
    }
  }

  async function handleDelete(userId) {
    try {
      await apiDeleteUser(userId);
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch (err) {
      setError(err.message || 'Failed to delete user');
    }
  }
  return (
    <div>
      <main className="container">
        <h2>User Data Fetch Using useEffect and useState hooks</h2>
        <UserForm
          firstName={firstName}
          lastName={lastName}
          weight={weight}
          height={height}
          birthDate={birthDate}
          age={age}
          onChange={(field, value) => {
            if (field === 'firstName') setFirstName(value);
            if (field === 'lastName') setLastName(value);
            if (field === 'weight') setWeight(value);
            if (field === 'height') setHeight(value);
            if (field === 'birthDate') setBirthDate(value);
            if (field === 'age') setAge(value);
          }}
          onSubmit={handleCreate}
        />
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
