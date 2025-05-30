import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from './firebase';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';

function MyRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        if (!currentUser) {
          throw new Error('Please log in to view your recipes.');
        }
        const q = query(collection(db, 'recipes'), where('userId', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);
        const userRecipes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRecipes(userRecipes);
      } catch (err) {
        setError(err.message);
      }
    };
    if (currentUser) fetchRecipes();
  }, [currentUser]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        await deleteDoc(doc(db, 'recipes', id));
        setRecipes(recipes.filter(r => r.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (error) return <div className="error">{error}</div>;

  return (
    <div className="recipes-container">
      <h2>My Recipes</h2>
      {recipes.length === 0 ? (
        <p>No recipes found. Create your first recipe!</p>
      ) : (
        <ul className="recipe-list">
          {recipes.map((recipe) => (
            <li key={recipe.id} className="recipe-item">
              <h3>{recipe.name}</h3>
              {recipe.image && <img src={recipe.image} alt={recipe.name} width="100" />}
              <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
              <p><strong>Instructions:</strong></p>
              <ol>
                {recipe.instructions.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
              <div className="recipe-actions">
                <button onClick={() => navigate(`/edit-recipe/${recipe.id}`)}>Edit</button>
                <button onClick={() => handleDelete(recipe.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => navigate('/add-recipe')}>Add New Recipe</button>
    </div>
  );
}

export default MyRecipes;