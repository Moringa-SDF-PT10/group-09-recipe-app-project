import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import useAuth

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function from context

  const handleSubmit = (event) => {
    event.preventDefault();
    // Simulate authentication logic
    console.log('Attempting login with:', { username, password });

    // Simulate receiving user data after successful login
    const userData = {
      username: username,
      email: `${username}@gmail.com`,

    };

    setTimeout(() => {
      console.log('Simulating successful login with user data:', userData);
      login(userData); // Call the login function from context with user data
      navigate('/MyRecipes'); // Redirect after login
    }, 500);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
         <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
