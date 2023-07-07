import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import axios from 'axios';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Create a navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make API call to authenticate user
      // Replace '/api/login' with the appropriate endpoint URL for your backend server
      const response = await axios.post('/api/login', { email, password });

      // Assuming the login is successful
      // Redirect to the library page
      navigate('/library');
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle login error, display error message, etc.
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}
    >
      <h2 style={{ marginBottom: '10px' }}>Login</h2>
      <label style={{ marginBottom: '5px' }}>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ marginBottom: '15px', padding: '5px', width: '200px' }}
      />
      <label style={{ marginBottom: '5px' }}>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ marginBottom: '15px', padding: '5px', width: '200px' }}
      />
      <button
        type="submit"
        style={{ padding: '8px 16px', backgroundColor: '#3498db', color: '#fff', border: 'none', cursor: 'pointer' }}
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;




