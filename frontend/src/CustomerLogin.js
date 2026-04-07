import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CustomerLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/auth/login', { email, password });
      if (response.data.role === 'CUSTOMER') {
        localStorage.setItem('token', response.data.token);
        navigate('/customer/dashboard');
      } else {
        alert('Not authorized as customer');
      }
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div>
      <h2>Customer Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default CustomerLogin;