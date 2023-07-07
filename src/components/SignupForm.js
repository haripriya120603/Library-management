import React, { useState } from 'react';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission and API call to backend server for user signup
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
      <h2 style={{ marginBottom: '10px' }}>Sign Up</h2>
      <label style={{ marginBottom: '5px' }}>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ marginBottom: '15px', padding: '5px', width: '200px' }} />
      <label style={{ marginBottom: '5px' }}>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ marginBottom: '15px', padding: '5px', width: '200px' }} />
      <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#3498db', color: '#fff', border: 'none', cursor: 'pointer' }}>Sign Up</button>
    </form>
  );
};

export default SignupForm;
