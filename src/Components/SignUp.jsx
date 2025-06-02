import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '' // Optional
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (errors[name]) {
        setErrors({
            ...errors,
            [name]: null
        });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      setSubmitting(true);

      // *** Simulate user registration using localStorage ***
      const users = JSON.parse(localStorage.getItem('users') || '[]'); // Get existing users
      const userExists = users.some(user =>
        user.username === formData.username || user.email === formData.email
      );

      if (userExists) {
        setErrors({ apiError: 'Username or email already exists.' });
        setSubmitting(false);
        return; // Stop if user exists
      }

      // Basic password hashing simulation (NOT for production)
      const hashedPassword = formData.password + '_hashed'; // Simple placeholder hash

      const newUser = {
        username: formData.username,
        email: formData.email,
        password: hashedPassword, // Store hashed password
        phoneNumber: formData.phoneNumber,
        id: `user-${Date.now()}` // Simple unique ID
      };

      const updatedUsers = [...users, newUser];
      localStorage.setItem('users', JSON.stringify(updatedUsers)); // Save updated users

      console.log('Simulated signup successful:', newUser);
      setSignupSuccess(true);
      setSubmitting(false);

      // Redirect to login page after successful signup
      setTimeout(() => {
         navigate('/Login');
      }, 2000);
      // *** End of Simulation ***

    } else {
      console.log('Form has validation errors.');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {signupSuccess && (
        <p style={{ color: 'green' }}>Signup successful! Redirecting to login...</p>
      )}
      {errors.apiError && (
          <p style={{ color: 'red' }}>{errors.apiError}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword}</p>}
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number (Optional):</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={submitting}>
          {submitting ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
