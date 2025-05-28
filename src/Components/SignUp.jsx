import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password);
      navigate("/profile");
    } catch (error) {
      console.error("Failed to sign up:", error);
    }
  }
return (
    <form onSubmit={handleSignUp}>
      <h2>Signup</h2>
      <input type= "email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Create Account</button>
    </form>
  );
}
