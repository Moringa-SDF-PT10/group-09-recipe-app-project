import React from "react";
import RecipeItem from "./RecipeItem";

const RecipeList = ({ recipes, onToggleFavorites, onEditRecipe, onDeleteRecipe }) => {
    const recipeItems = recipes.map((recipe) =>
    <RecipeItem
       key={`custom-${recipe.id}`}
       recipe={recipe}
       onToggleFavorite={onToggleFavorites}
       onEditRecipe={onEditRecipe}
       onDeleteRecipe={onDeleteRecipe}
    />)
  return (
    <section>
        <h1>Recipes</h1>
        <ul>{recipeItems}</ul>
    </section>
  )

};

export default RecipeList;