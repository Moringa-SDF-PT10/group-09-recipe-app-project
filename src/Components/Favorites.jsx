// src/Components/Favorites.jsx
import { useState, useEffect, useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
// import { getFavorites } from '../utils/favorites';

function Favorites() {
  const { user } = useContext(AuthContext);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const allRecipes = JSON.parse(localStorage.getItem('recipes') || '[]');
    const favoriteIds = getFavorites(user?.id);
    const recipes = allRecipes.filter((recipe) => favoriteIds.includes(recipe.id));
    setFavoriteRecipes(recipes);
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-orange-600 mb-4">My Favorites</h2>
      {favoriteRecipes.length === 0 ? (
        <p>
          No favorite recipes yet.{' '}
          <Link to="/recipes" className="text-orange-500 hover:underline">
            Browse recipes
          </Link>
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favoriteRecipes.map((recipe) => (
            <div key={recipe.id} className="border p-4 rounded-lg shadow-md bg-white">
              <h3 className="text-lg font-semibold text-gray-800">{recipe.name}</h3>
              <p className="text-sm text-gray-600">{recipe.category || 'No category'}</p>
              <Link
                to={`/recipes/${recipe.id}`}
                className="text-orange-500 hover:underline"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;