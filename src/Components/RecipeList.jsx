import {useState, useEffect} from "react";

const RecipeList = () => {
  const[recipes, setRecipes] = useState([])
  const [error, setError] = useState(null)
  useEffect (() => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
    .then ((response) => response.json())
    .then ((data) =>{
       if (data.meals && data.meals.length > 0) {
          setRecipes(data.meals);
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
          <li key={recipe.idMeal || index}>
            <h3>{recipe.strMeal}</h3>
            <img
              src={recipe.strMealThumb}
              
          
            />
            <p>Category: {recipe.strCategory}</p>
            
            
            <p>Ingredients: </p>
            <ul>
              {[...Array(20)].map((item, i) => {
              const ingredient = recipe[`strIngredient${i + 1}`];
              const measure = recipe[`strMeasure${i + 1}`];
              return ingredient ? <li key={i}>{measure} {ingredient}</li> : null;
              })}
            </ul>

            
            <p>Instructions: </p>
            <ol>

              {recipe.strInstructions
              .split(".") 
              .map((step, index) => step.trim() && <li key={index}>{step}.</li>)}
            </ol>
            {recipe.strYoutube && (
              <p>
                <a href={recipe.strYoutube} target="_blank" >
                  Watch Video
                </a>
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>


  )
}
export default RecipeList;