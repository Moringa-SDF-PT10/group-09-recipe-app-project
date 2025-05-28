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
    <div
      style={{
        maxWidth: 400,
        margin: "40px auto",
        padding: 32,
        borderRadius: 12,
        background: "#fff",
        boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>Sign Up</h2>
      <form
        onSubmit={handleSignUp}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <label>
          Email:
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: 8,
              marginTop: 4,
              borderRadius: 6,
              border: "1px solid #ccc",
            }}
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
            style={{
              width: "100%",
              padding: 8,
              marginTop: 4,
              borderRadius: 6,
              border: "1px solid #ccc",
            }}
          />
        </label>
        <button
          type="submit"
          style={{
            padding: "10px 0",
            borderRadius: 6,
            background: "#646cff",
            color: "#fff",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
          }}
        >
          Create Account
        </button>
        {error && (
          <p style={{ color: "red", textAlign: "center" }}>{error}</p>
        )}
      </form>
      <p style={{ textAlign: "center", marginTop: 16 }}>
        Already have an account?{" "}
        <a href="/login" style={{ color: "#646cff" }}>
          Login
        </a>
      </p>
    </div>
  );
}
