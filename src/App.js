import { useEffect, useState } from 'react';
import './App.css';
import UserCard from './components/UserCard';
import UserForm from './components/UserForm.jsx';
import { fetchUsers, createUser as apiCreateUser, updateUser as apiUpdateUser, deleteUser as apiDeleteUser } from './services/usersApi';

// state management using useEffect and useState hooks
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

  // fetch users from the API (Data loading using useEffect hook)
  useEffect(() => {
    const controller = new AbortController();
  
    (async () => {
      try {
        const list = await fetchUsers(controller.signal);
        setUsers(list); //Update state with the fetched users
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message || 'Something went wrong'); //Update state with the error
      } finally {
        setLoading(false); //Update state with the loading status
      }
    })();
  
    //Cleanup function to abort the fetch request
    return () => controller.abort(); 
  }, []);
  

  // Create User Handler
  async function handleCreate(e) {
    e.preventDefault();
    try {
      const created = await apiCreateUser({ firstName, lastName, weight, height, birthDate, age });
      setUsers((prev) => [created, ...prev]);  //add new user to top es6+
      //clear form fields
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

  //updates user handler
  async function handleUpdate(user) {
    try {
      setError(null); // clear previous error
      const updated = await apiUpdateUser(user.id, { lastName: `${user.lastName} (Updated)` });
      setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, ...updated } : u)));
    } catch (err) {
      setError(err.message || 'Failed to update user');
    }
  }

  async function handleDelete(userId) {
    try {
      setError(null);
      await apiDeleteUser(userId);
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch (err) {
      setError('Failed to delete user');
    }
  }
  return (
    <div>
      <main className="container">
        <h2>User Data Fetch Using useEffect and useState hooks</h2>
        
        {/* form component to create a new user */}
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
          <p role="alert" style={{ color: 'salmon' }}>{error}</p>
        )}
        {!loading && !error && (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {users?.map((u) => (
              <UserCard key={u.ids} user={u} onUpdate={handleUpdate} onDelete={handleDelete} />
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

export default App;
