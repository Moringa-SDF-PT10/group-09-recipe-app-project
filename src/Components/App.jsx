import { useState } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import Home from './Home'
import EditRecipe from './EditRecipe'
import Favorites from './Favorites'
import Form from './Form'
import Login from './Login'
import MyRecipes from './MyRecipes'
import Search from './Search'
import Profile from './Profile'
import RecipeList from './RecipeList'
import SignUp from './SignUp'

function App() {

  return (
    <div>
     <nav>
      <Link to={"./"}>Home</Link>
      <Link to={"./EditRecipe"}>EditRecipe</Link>
      <Link to={"./Favorites"}>Favorites</Link>
      <Link to={"./Form"}>Create New Recipe</Link>
      <Link to={"./Login"}>Login</Link>
      <Link to={"./MyRecipes"}>My Recipes</Link>
      <Link to={"./Search"}>Search</Link>
      <Link to={"./Profile"}>My Profile</Link>
      <Link to={"./RecipeList"}>View Recipes</Link>
      <Link to={"./SignUp"}>Sign Up</Link>

     </nav>
     <main>
      <Routes>
        <Route path='./' element={<Home /> }/>
        <Route path='./EditRecipe' element={<EditRecipe /> }/>
        <Route path='./Favorites' element={<Favorites /> }/>
        <Route path='./Form' element={<Form /> }/>
        <Route path='./Login' element={<Login /> }/>
        <Route path='./MyRecipes' element={<MyRecipes /> }/>
        <Route path='./Search' element={<Search /> }/>
        <Route path='./Profile' element={<Profile /> }/>
        <Route path='./RecipeList' element={<RecipeList /> }/>
        <Route path='./SignUp' element={<SignUp /> }/>
      </Routes>
      </main>

    </div>
  )
}

export default App
