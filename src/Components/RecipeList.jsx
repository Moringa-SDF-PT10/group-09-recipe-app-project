import {useState, useEffect} from "react";

const RecipeList = () => {
  const[recipes, setRecipes] = useState([])
  const [error, setError] = useState(null)
  useEffect (() => {
    fetch("https://dummyjson.com/recipes")
    .then ((response) => response.json())
    .then ((data) =>{
       if (data.recipes && data.recipes.length > 0) {
          setRecipes(data.recipes);
        }
    } )
     .catch((err) => setError(err.message))

  },[])
  if (error) return <div>Error: {error}</div>
  return (
    <div>
      <h2>Recipes</h2>
      <ul>
        {recipes.map((recipe, index) => (
          <li key={recipe.id || index}>
            <h3>{recipe.name}</h3>
            <img
              src={recipe.image}
              alt={recipe.name}
          
            />
            
            <p>Ingredients: </p>
            <ul>
              {recipe.ingredients.map((item, i) => (
                <li key={i}>{item}</li>
              )
              
              )}
            </ul>

            
            <p>Instructions: </p>
            <ol>
              {Array.isArray(recipe.instructions)
              ? recipe.instructions.map((step, index) => (
              <li key={index}>{step}</li>
              )) : <li>No instructions available.</li>}
            </ol>
          </li>
        ))}
      </ul>
    </div>


  )
}
export default RecipeList;