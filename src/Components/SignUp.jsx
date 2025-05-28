import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup(email, password);
      navigate("/profile");
    } catch (error) {
      setError("Failed to sign up.");
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Sign Up</h2>
      <form className="auth-form" onSubmit={handleSignUp}>
        <label>
          Email:
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Create Account</button>
        {error && <p className="auth-error">{error}</p>}
      </form>
      <p className="auth-link">
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}