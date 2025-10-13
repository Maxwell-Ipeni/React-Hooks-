import React from 'react';
import './UserForm.css';

function UserForm({ firstName, lastName, weight, height, birthDate, age, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="formGridThreeRows">
      <input value={firstName} onChange={(e) => onChange('firstName', e.target.value)} placeholder="First name" />
      <input value={lastName} onChange={(e) => onChange('lastName', e.target.value)} placeholder="Last name" />
      <input value={weight} onChange={(e) => onChange('weight', e.target.value)} placeholder="Weight" />
      <input value={height} onChange={(e) => onChange('height', e.target.value)} placeholder="Height" />
      <input value={birthDate} onChange={(e) => onChange('birthDate', e.target.value)} placeholder="Birth Date" />
      <input value={age} onChange={(e) => onChange('age', e.target.value)} placeholder="Age" />
      <button type="submit" className="submitButtonCell">Create (POST)</button>
    </form>
  );
}

export default UserForm;


