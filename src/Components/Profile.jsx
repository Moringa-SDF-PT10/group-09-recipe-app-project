import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">Profile Page</h1>
      {currentUser ? (
        <div>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "#646cff22",
              margin: "0 auto 16px auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              color: "#646cff",
            }}
          >
            {currentUser.email[0].toUpperCase()}
          </div>
          <h2 style={{ marginBottom: 8 }}>Welcome,</h2>
          <p style={{ fontWeight: 500, marginBottom: 24 }}>
            {currentUser.email}
          </p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};

export default Profile;