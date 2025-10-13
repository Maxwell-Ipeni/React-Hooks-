import React from 'react';

function UserCard({ user }) {
  if (!user) return null;

  return (
    <li style={{
      border: '1px solid #666',
      borderRadius: 10,
      padding: 16,
      marginBottom: 14,
      background: '#26292e',
      color: '#f1f1f1',
      boxShadow: '0 4px 14px rgba(0,0,0,0.35)',
      lineHeight: 1.4
    }}>
      <div style={{ fontSize: 18, fontWeight: 600 }}>{user.firstName} {user.lastName}</div>
      <div>Age: {user.age}</div>
      <div>Phone: {user.phone}</div>
      <div>height:{user.height}</div>
      <div>weight:{user.weight}</div>
      <div>birthDate:{user.birthDate}</div>
      <img src={user.image} alt={user.firstName} />
      {user.email && <div>Email: {user.email}</div>}

    </li>
  );
}

export default UserCard;


