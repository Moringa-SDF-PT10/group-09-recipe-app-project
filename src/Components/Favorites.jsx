import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from './firebase';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (!currentUser) {
          throw new Error('Please log in to view your favorites.');
        }
        // Fetch favorites
        const q = query(collection(db, 'favorites'), where('userId', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);
        const favoriteIds = querySnapshot.docs.map(doc => ({ id: doc.id, recipeId: doc.data().recipeId }));

        // Fetch recipes
        const firestoreRecipes = await getDocs(collection(db, 'recipes'));
        const apiRecipes = await fetch('https://dummyjson.com/recipes').then(res => res.json());
        const allRecipes = [
          ...firestoreRecipes.docs.map(doc => ({ id: doc.id, ...doc.data() })),
          ...(apiRecipes.recipes || []).map(r => ({ ...r, id: r.id.toString() })),
        ];
        const favoriteRecipes = favoriteIds
          .map(fav => allRecipes.find(r => r.id === fav.recipeId))
          .filter(Boolean)
          .map(recipe => ({ ...recipe, favoriteId: favoriteIds.find(f => f.recipeId === recipe.id).id }));
        setFavorites(favoriteRecipes);
      } catch (err) {
        setError(err.message);
      }
    };
    if (currentUser) fetchFavorites();
  }, [currentUser]);

  const handleRemoveFavorite = async (favoriteId) => {
    if (window.confirm('Remove this recipe from favorites?')) {
      try {
        await deleteDoc(doc(db, 'favorites', favoriteId));
        setFavorites(favorites.filter(f => f.favoriteId !== favoriteId));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (error) return <div className="error">{error}</div>;

  return (
    <div className="recipes-container">
      <h2>My Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorite recipes found.</p>
      ) : (
        <ul className="recipe-list">
          {favorites.map((recipe) => (
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
              <button onClick={() => handleRemoveFavorite(recipe.favoriteId)}>Remove from Favorites</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Favorites;