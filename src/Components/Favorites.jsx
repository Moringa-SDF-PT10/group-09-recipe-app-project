import React from "react";

const Favorites = ({recipes}) => {
  return (
    <div>
      <h1>Favorite Recipes</h1>
      <div className="item-div">
        {recipes.map((recipe) => (
          <div key={recipe.id}
          >
            <h3>{recipe.name}</h3>
            {recipe.image && (
              <img
                src={ recipe.image}
                alt={ recipe.name}
              />
            )}
            <div >
              <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
              <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
              <p><strong>Prep Time:</strong> {recipe.prepTimeMinutes} minutes</p>
              <p><strong>Cook Time:</strong> {recipe.cookTimeMinutes} minutes</p>
              <p><strong>Servings:</strong> {recipe.servings}</p>
              <p><strong>Calories:</strong> {recipe.caloriesPerServing} per serving</p>
              {recipe.tags && recipe.tags.length > 0 && (
                <p><strong>Tags:</strong> {Array.isArray(recipe.tags) ? recipe.tags.join(', ') : recipe.tags}</p>
              )}
              {recipe.mealType && (
                <p><strong>Meal Type:</strong> {Array.isArray(recipe.mealType) ? recipe.mealType.join(', ') : recipe.mealType}</p>
              )}
            </div>
            <details >
              <summary >View Ingredients & Instructions</summary>
              <div>
                <h4>Ingredients:</h4>
                <ul>
                  {Array.isArray(recipe.ingredients)
                    ? recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))
                    : <li>{recipe.ingredients}</li>
                  }
                </ul>
                <h4>Instructions:</h4>
                <ol>
                  {Array.isArray(recipe.instructions)
                    ? recipe.instructions.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                      ))
                    : <li>{recipe.instructions}</li>
                  }
                </ol>
              </div>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;