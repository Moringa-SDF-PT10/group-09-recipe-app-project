import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Home = ({ isAuthenticated }) => {
  return (
    <div className="home-container">
      <Header />
      <section className="hero-section">
        <h1>Welcome to the Recipe App!</h1>
        <p>Your go-to place for discovering, managing, and creating delicious recipes.</p>
      </section>

      <section className="features-overview">
        <h2>What you can do:</h2>
        <div className="feature-list">
          <div className="feature-item">
            <h3>Browse Recipes</h3>
            <p>Explore a wide variety of recipes from our collection.</p>
            <Link to="/RecipeList" className="feature-link">View All Recipes</Link>
          </div>

          <div className="feature-item">
            <h3>Search by Ingredients</h3>
            <p>Find recipes based on the ingredients you have on hand.</p>
            <Link to="/Search" className="feature-link">Search Recipes</Link>
          </div>

          {isAuthenticated && (
            <>
              <div className="feature-item">
                <h3>Save Your Favorites</h3>
                <p>Keep track of your most loved recipes.</p>
                <Link to="/Favorites" className="feature-link">View Favorites</Link>
              </div>

              <div className="feature-item">
                <h3>Create Your Own Recipes</h3>
                <p>Add your unique culinary creations to the app.</p>
                <Link to="/Form" className="feature-link">Add New Recipe</Link>
              </div>

              <div className="feature-item">
                <h3>Manage Your Recipes</h3>
                <p>See and edit the recipes you've created.</p>
                <Link to="/My Recipes" className="feature-link">View My Recipes</Link>
              </div>
              <div className="feature-item">
                <h3>Manage Your Profile</h3>
                <p>Update your profile information.</p>
                <Link to="/Profile" className="feature-link">View Profile</Link>
              </div>
            </>
          )}

          {!isAuthenticated && (
             <div className="feature-item">
             <h3>Join Us!</h3>
             <p>Sign up to unlock features like saving favorites and creating your own recipes.</p>
             <Link to="/SignUp" className="feature-link">Sign Up</Link>
           </div>
          )}

        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
