import React from 'react';
import { useAuth } from './AuthContext'; // Import useAuth

const Profile = () => {
  const { currentUser, loadingAuth } = useAuth(); // Get user data and loading state from context

  // Optional: Handle loading state from context
  if (loadingAuth) {
      return <div>Loading profile...</div>;
  }

  if (!currentUser) {
      return <div>Error loading profile data.</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <div>
        <p><strong>Username:</strong> {currentUser.username}</p>
        <p><strong>Email:</strong> {currentUser.email}</p>
        {currentUser.phoneNumber && (
             <p><strong>Phone Number:</strong> {currentUser.phoneNumber}</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
