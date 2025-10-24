import React from 'react';
import './UserCard.css';
//user card component to display user information
function UserCard({ user, onUpdate, onDelete }) {
  if (!user) return null;

  //display user information
  return (
    <li className="card">
      <div className="cardHeader">{user.firstName} {user.lastName}</div>
      <div>Age: {user.ages}</div>
      <div>Phone: {user.phone}</div>
      <div>height:{user.height}</div>
      <div>weight:{user.weight}</div>
      <div>birthDate:{user.birthDate}</div>

      {/*display user image if it exists*/}
      <img src={user.image} alt={user.firstName} />

      {/*display user email if it exists*/}
      {user.email && <div>Email: {user.email}</div>}

      {/*display user actions*/}
      <div className="actions">
        <button onClick={() => onUpdate && onUpdate(user)}>Update (PUT)</button>
        <button onClick={() => onDelete && onDelete(user.id)} className="deleteButton">Delete (DELETE)</button>
      </div>
    </li>
  );
}

export default UserCard;


