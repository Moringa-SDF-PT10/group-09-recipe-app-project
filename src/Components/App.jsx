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
<<<<<<< HEAD
      <nav>
        <Link to="/">Home</Link>
        <Link to="/add-recipe">Add Recipe</Link>
        <Link to="/my-recipes">My Recipes</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/search">Search</Link>
        <Link to="/profile">My Profile</Link>
        <Link to="/recipe-list">View Recipes</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-recipe" element={
            <ProtectedRoute>
              <Form />
            </ProtectedRoute>
          } />
          <Route path="/edit-recipe/:id" element={
            <ProtectedRoute>
              <EditRecipe />
            </ProtectedRoute>
          } />
          <Route path="/favorites" element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          } />
          <Route path="/my-recipes" element={
            <ProtectedRoute>
              <MyRecipes />
            </ProtectedRoute>
          } />
          <Route path="/search" element={<Search />} />
          <Route path="/recipe-list" element={<RecipeList />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
=======
     <nav>
      <Link to={"/"}>Home</Link>
      <Link to={"/Edit Recipe"}>Edit Recipe</Link>
      <Link to={"/Favorites"}>Favorites</Link>
      <Link to={"/Form"}>Create New Recipe</Link>
      <Link to={"/Login"}>Login</Link>
      <Link to={"/My Recipes"}>My Recipes</Link>
      <Link to={"/Search"}>Search</Link>
      <Link to={"/Profile"}>My Profile</Link>
      <Link to={"/RecipeList"}>View Recipes</Link>
      <Link to={"/SignUp"}>Sign Up</Link>

     </nav>
     <main>
      <Routes>
        <Route path='/' element={<Home /> }/>
        <Route path='/Edit Recipe' element={<EditRecipe /> }/>
        <Route path='/Favorites' element={<Favorites /> }/>
        <Route path='/Form' element={<Form /> }/>
        <Route path='/Login' element={<Login /> }/>
        <Route path='/My Recipes' element={<MyRecipes /> }/>
        <Route path='/Search' element={<Search /> }/>
        <Route path='/Profile' element={<Profile /> }/>
        <Route path='/RecipeList' element={<RecipeList /> }/>
        <Route path='/SignUp' element={<SignUp /> }/>
      </Routes>
>>>>>>> origin/main
      </main>
      <footer>
        <p>© 2023 Recipe App</p>
      </footer>
    </div>
  );
}

export default App;