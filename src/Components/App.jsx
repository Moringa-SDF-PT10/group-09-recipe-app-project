import { Link, Routes, Route } from 'react-router-dom';
import Home from './Home';
import EditRecipe from './EditRecipe';
import Favorites from './Favorites';
import Form from './Form';
import Login from './Login';
import MyRecipes from './MyRecipes';
import Search from './Search';
import Profile from './Profile';
import RecipeList from './RecipeList';
import SignUp from './SignUp';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/edit-recipe">Edit Recipe</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/form">Create New Recipe</Link>
        <Link to="/login">Login</Link>
        <Link to="/my-recipes">My Recipes</Link>
        <Link to="/search">Search</Link>
        <Link to="/profile">My Profile</Link>
        <Link to="/recipe-list">View Recipes</Link>
        <Link to="/signup">Sign Up</Link>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit-recipe" element={<EditRecipe />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/form" element={<Form />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/search" element={<Search />} />
          <Route path="/recipe-list" element={<RecipeList />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-recipes"
            element={
              <ProtectedRoute>
                <MyRecipes />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
