import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function Form() {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Please log in to create a recipe.');
      navigate('/login');
      return;
    }

    const newRecipe = {
      id: uuidv4(),
      title,
      ingredients,
      instructions,
      imageUrl,
      userId,
      createdAt: new Date().toISOString(),
    };

    const recipes = JSON.parse(localStorage.getItem('recipes') || '[]');
    recipes.push(newRecipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));

    alert('Recipe created successfully!');
    navigate('/my-recipes');
  };

  return (
    <div className="form-container">
      <h2>Create New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Ingredients (comma-separated):</label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Instructions:</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Image URL (optional):</label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
}

export default Form;