// src/Components/MyRecipes.jsx
import { useState, useEffect, useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function MyRecipes() {
  const { user } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const allRecipes = JSON.parse(localStorage.getItem('recipes') || '[]');
    const userRecipes = allRecipes.filter((recipe) => recipe.userId === user?.id);
    setRecipes(userRecipes);
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-orange-600 mb-4">My Recipes</h2>
      {recipes.length === 0 ? (
        <p>
          No recipes found.{' '}
          <Link to="/add-recipe" className="text-orange-500 hover:underline">
            Add one now!
          </Link>
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="border p-4 rounded-lg shadow-md bg-white">
              <h3 className="text-lg font-semibold text-gray-800">{recipe.name}</h3>
              <p className="text-sm text-gray-600">{recipe.category || 'No category'}</p>
              <Link
                to={`/edit-recipe/${recipe.id}`}
                className="text-orange-500 hover:underline"
              >
                Edit
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyRecipes;