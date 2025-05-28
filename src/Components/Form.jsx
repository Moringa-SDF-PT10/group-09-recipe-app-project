// src/Components/Form.jsx
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext'; // From Developer 3

function Form({ isEditing = false }) {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    category: '',
    userId: user?.id || 'anonymous',
  });

  useEffect(() => {
    if (isEditing && id) {
      const recipes = JSON.parse(localStorage.getItem('recipes') || '[]');
      const recipe = recipes.find((r) => r.id === id);
      if (recipe && recipe.userId === user?.id) {
        setFormData(recipe);
      } else {
        navigate('/my-recipes');
      }
    }
  }, [id, isEditing, navigate, user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const recipes = JSON.parse(localStorage.getItem('recipes') || '[]');
    if (isEditing) {
      const updatedRecipes = recipes.map((r) =>
        r.id === id ? { ...formData, id } : r
      );
      localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    } else {
      const newRecipe = { ...formData, id: Date.now().toString() };
      localStorage.setItem('recipes', JSON.stringify([...recipes, newRecipe]));
    }
    navigate('/my-recipes');
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-orange-600 mb-4">
        {isEditing ? 'Edit Recipe' : 'Add Recipe'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Recipe Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring-orange-500 focus:border-orange-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Ingredients</label>
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring-orange-500 focus:border-orange-500"
            rows="4"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Instructions</label>
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring-orange-500 focus:border-orange-500"
            rows="4"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition"
        >
          {isEditing ? 'Update Recipe' : 'Add Recipe'}
        </button>
      </form>
    </div>
  );
}

export default Form;