import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from './firebase';
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';

function Form({ isEditing }) {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (isEditing && id) {
      const fetchRecipe = async () => {
        try {
          const docRef = doc(db, 'recipes', id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists() && docSnap.data().userId === currentUser.uid) {
            const recipe = docSnap.data();
            setName(recipe.name);
            setIngredients(recipe.ingredients.join(', '));
            setInstructions(recipe.instructions.join('\n'));
            setImage(recipe.image);
          } else {
            throw new Error('Recipe not found or unauthorized.');
          }
        } catch (err) {
          setError(err.message);
        }
      };
      fetchRecipe();
    }
  }, [isEditing, id, currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert('Please log in to create a recipe.');
      navigate('/login');
      return;
    }

    try {
      const recipeData = {
        name,
        ingredients: ingredients.split(',').map(item => item.trim()).filter(item => item),
        instructions: instructions.split('\n').map(step => step.trim()).filter(step => step),
        image: image || 'https://via.placeholder.com/150',
        userId: currentUser.uid,
        createdAt: new Date().toISOString(),
      };

      if (isEditing && id) {
        // Update existing recipe
        const docRef = doc(db, 'recipes', id);
        await updateDoc(docRef, recipeData);
        alert('Recipe updated successfully!');
      } else {
        // Create new recipe
        await addDoc(collection(db, 'recipes'), recipeData);
        alert('Recipe created successfully!');
      }
      navigate('/my-recipes');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="form-container">
      <h2>{isEditing ? 'Edit Recipe' : 'Create New Recipe'}</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Ingredients (comma-separated):</label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="e.g., Flour, Sugar, Cocoa"
            required
          />
        </div>
        <div className="form-group">
          <label>Instructions (one per line):</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="e.g., Mix ingredients\nBake at 350°F"
            required
          />
        </div>
        <div className="form-group">
          <label>Image URL (optional):</label>
          <input
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <button type="submit">{isEditing ? 'Update Recipe' : 'Create Recipe'}</button>
      </form>
    </div>
  );
}

export default Form;