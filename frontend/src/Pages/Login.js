import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      setLoginStatus('');
      const response = await axios.post('http://localhost:8080/api/login', { username, password });
      const { token, is_admin, is_client } = response.data;

      if (token) {
        localStorage.setItem('token', token);
        
        if (is_admin) {
          login({ name: username, type: 'admin', token });
          navigate('/');
        } else if (is_client) {
          login({ name: username, type: 'client', token });
          navigate('/');
        } else {
          setLoginStatus('Invalid role.');
        }
      } else {
        setLoginStatus('Invalid credentials or user type.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginStatus('Login error: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">Email</label>
        <input
          type="text"
          className="form-control"
          id="username"
          placeholder="Votre email"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Mot de passe</label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Votre mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <button className="btn btn-primary mb-4" onClick={handleLogin}>Se connecter</button>
      {loginStatus && <p>{loginStatus}</p>}
    </div>
  );
};

export default Login;
