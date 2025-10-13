import React from 'react';
import './UserCard.css';

function UserCard({ user, onUpdate, onDelete }) {
  if (!user) return null;

  return (
    <li className="card">
      <div className="cardHeader">{user.firstName} {user.lastName}</div>
      <div>Age: {user.age}</div>
      <div>Phone: {user.phone}</div>
      <div>height:{user.height}</div>
      <div>weight:{user.weight}</div>
      <div>birthDate:{user.birthDate}</div>
      <img src={user.image} alt={user.firstName} />
      {user.email && <div>Email: {user.email}</div>}
      <div className="actions">
        <button onClick={() => onUpdate && onUpdate(user)}>Update (PUT)</button>
        <button onClick={() => onDelete && onDelete(user.id)} className="deleteButton">Delete (DELETE)</button>
      </div>
    </li>
  );
}

export default UserCard;


