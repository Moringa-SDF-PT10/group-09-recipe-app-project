import { useEffect, useState, useRef } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Favorites from './Favorites';
import Form from './Form';
import Login from './Login';
import MyRecipes from './MyRecipes';
import Search from './Search';
import Profile from './Profile';
import RecipeList from './RecipeList';
import SignUp from './SignUp';
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { useAuth } from './AuthContext'

function App() {
  const [recipes, setRecipes] = useState([]);
  const [customRecipes, setCustomRecipes] = useState([]); // Store user-created recipes
  const [loading, setLoading] = useState(true);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const limit = 10; // Number of recipes to fetch from API
  const navigate = useNavigate();
  const { isAuthenticated, currentUser, loadingAuth, logout } = useAuth();



  useEffect(() => {
    // Fetch recipes from DummyJSON API
    fetch('https://dummyjson.com/recipes?limit=' + limit)
      .then((r) => r.json())
      .then((data) => {
        if (data.recipes) {
          const apiDataWithIds = data.recipes.map(recipe => ({
            ...recipe,
            id: `api-${recipe.id}`,
          }));
          setRecipes(apiDataWithIds); // Update recipes state
        } else {
          setRecipes([]);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching recipes from DummyJSON:", error);
        setLoading(false);
      });

    // Load custom recipes from localStorage on app start
    const savedCustomRecipes = localStorage.getItem('customRecipes');
    if (savedCustomRecipes) {
      try {
        setCustomRecipes(JSON.parse(savedCustomRecipes));
      } catch (e) {
        console.error("Failed to parse custom recipes from localStorage:", e);
        localStorage.removeItem('customRecipes'); // Clear invalid data
      }
    }

  }, []);

  function handleToggleFavorite(id) {
    // Determine if the recipe is custom or from the API
    const isCustom = customRecipes.some((recipe) => recipe.id === id);

    if (isCustom) {
      const updatedCustomRecipes = customRecipes.map((recipe) =>
        recipe.id === id ? { ...recipe, favorite: !recipe.favorite } : recipe
      );
      setCustomRecipes(updatedCustomRecipes);
      localStorage.setItem('customRecipes', JSON.stringify(updatedCustomRecipes)); // Save updated custom recipes
    } else {
      const updatedRecipes = recipes.map((recipe) =>
        recipe.id === id ? { ...recipe, favorite: !recipe.favorite } : recipe
      );
      setRecipes(updatedRecipes);
    }
  }

  // Function to handle adding a new custom recipe
  function handleAddRecipe(newRecipe) {
    const newId = `custom-${Date.now()}`;
    const recipeWithId = {
      ...newRecipe,
      id: newId,
      isCustom: true, // Flag to identify user-created recipes
      favorite: false, // Initialize favorite status
    };

    const updatedCustomRecipes = [recipeWithId, ...customRecipes];
    setCustomRecipes(updatedCustomRecipes);

    // Save updated custom recipes to localStorage
    localStorage.setItem('customRecipes', JSON.stringify(updatedCustomRecipes));
  }

  // Combine API recipes with custom recipes
  const allRecipes = [...customRecipes, ...recipes];

  //Function to update an existing recipe
  function handleUpdateRecipe(updatedRecipe) {
    // Find and update in either recipes or customRecipes
    const isCustom = customRecipes.some(recipe => recipe.id === updatedRecipe.id);

    if (isCustom) {
      const updated = customRecipes.map(recipe =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      );
      setCustomRecipes(updated);
      localStorage.setItem('customRecipes', JSON.stringify(updated));
    } else {
      const updated = recipes.map(recipe =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      );
      setRecipes(updated);
    }
    setEditingRecipe(null);
  }

  // function to edit a recipe
  function handleEditRecipe(recipe) {
    setEditingRecipe(recipe);
    navigate('/Form');
  }

  //function to delete a recipe
 function handleDeleteRecipe(id) {
  const stringId = String(id);
  console.log("Deleting recipe with ID:", stringId);

  if (stringId.startsWith("custom-")) {
    const updatedCustomRecipes = customRecipes.filter(
      (recipe) => String(recipe.id) !== stringId
    );
    console.log("Updated custom recipes:", updatedCustomRecipes);
    setCustomRecipes(updatedCustomRecipes);
    localStorage.setItem('customRecipes', JSON.stringify(updatedCustomRecipes));
  } else {
    const updatedApiRecipes = recipes.filter(
      (recipe) => String(recipe.id) !== stringId
    );
    setRecipes(updatedApiRecipes);
  }
}


  // Filter logic for Favorites page
  const favoriteRecipes = allRecipes.filter(recipe => recipe.favorite);

if (loadingAuth || loading) {
  return <div style={{ textAlign: "center", paddingTop: "3rem" }}>
    <h2>Loading Recipes...</h2>
  </div>;
}

  return (
      <div>
        <nav>
          <Link to={"/"}>Home</Link>
          <Link to={"/RecipeList"}>View All Recipes</Link>
          {isAuthenticated ? (
            <>
              <Link to={"/Search"}>Search Recipe By Ingredients</Link>
              <Link to={"/Favorites"}>Favorites</Link>
              <Link to={"/Form"}>Create New Recipe</Link>
              <Link to={"/My Recipes"}>My Recipes</Link>
              <Link to={"/Profile"}>My Profile</Link>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to={"/Login"}>Login</Link>
              <Link to={"/SignUp"}>Sign Up</Link>
            </>
          )}
        </nav>
        <main>
          <Routes>
            {/* Public Routes */}
            <Route path='/' element={<Home
              recipes={allRecipes}
              onToggleFavorites={handleToggleFavorite}
              onEditRecipe={handleEditRecipe}
            />} />
            <Route path='/RecipeList' element={<RecipeList
              recipes={allRecipes}
              onToggleFavorites={handleToggleFavorite}
              onEditRecipe={handleEditRecipe}
              onDeleteRecipe={handleDeleteRecipe}
              />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/SignUp' element={<SignUp />} />

            <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
                <Route path='/Search' element={<Search recipes={allRecipes} />} />
                <Route path='/Favorites' element={<Favorites recipes={favoriteRecipes} />} />
                <Route path='/Form' element={<Form
                  onAddRecipe={handleAddRecipe}
                  onUpdateRecipe={handleUpdateRecipe}
                  editingRecipe={editingRecipe}
                />} />
                <Route path='/My Recipes' element={<MyRecipes customRecipes={customRecipes} />} />
                <Route path='/Profile' element={<Profile currentUser={currentUser} />} />
            </Route>
          </Routes>
        </main>
      </div>
  );
}

export default App;
