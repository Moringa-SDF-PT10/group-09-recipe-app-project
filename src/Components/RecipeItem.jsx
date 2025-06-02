import React from "react";

const RecipeItem = ({ recipe, onToggleFavorite, onEditRecipe, onDeleteRecipe}) => {
    const { name, image, id} = recipe
    // Handle different recipe formats (DummyJSON vs Custom)
    let ingredients = [];
    if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
        ingredients = recipe.ingredients.map(ingredient => ({
            ingredient: ingredient,
            measure: ''
        }));
    }

    const ingredientItems = ingredients.map((item, index) => (
        <li key={index}> {item.measure} {item.ingredient}</li>
    ))

   let instructions = [];
    if (recipe.instructions && Array.isArray(recipe.instructions)) {
        instructions = recipe.instructions.map(instruction => ({
            instruction: instruction,
            measure: ''
        }));
    }


    const instructionItems = instructions.map((step, index) => (
        <li key={index}> {step.instruction}</li>
    ))


    //function for deleting the recipe
     function deleteRecipe() {
        const isConfirmed = window.confirm('Are you sure you want to delete this recipe?');

        if (isConfirmed) {
            onDeleteRecipe(recipe.id);
        }
}

  return (
    <div className="item-div">
        <h2>{name}</h2>
        {recipe.cuisine && (
            <div >
                <span><strong>Cuisine:</strong> {recipe.cuisine} | </span>
                <span><strong>Difficulty:</strong> {recipe.difficulty} | </span>
                <span><strong>Prep:</strong> {recipe.prepTimeMinutes}min | </span>
                <span><strong>Cook:</strong> {recipe.cookTimeMinutes}min | </span>
                <span><strong>Servings:</strong> {recipe.servings}</span>
                {recipe.isCustom && <span > | Custom Recipe</span>}
            </div>
        )}
        {image && (
            <img
                src={image}
                alt={`Image of ${name}`}
            />
        )}
            <details>
                <summary>View Ingredients and instructions</summary>
                <div>
                    <h4>Ingredients</h4>
                    <ul>{ingredientItems}</ul>
                </div>
                <div>
                    <h4>How to Make It</h4>
                    <ol>{instructionItems}</ol>
                </div>
            </details>

        {recipe.tags && recipe.tags.length > 0 && (
            <div >
                <strong>Tags:</strong> {Array.isArray(recipe.tags) ? recipe.tags.join(', ') : recipe.tags}
            </div>
        )}
        <button onClick={() => onEditRecipe(recipe)}>Edit Recipe</button>
        <button onClick={() => onToggleFavorite(recipe.id)}>{recipe.favorite ? "👎" : "🩷"}</button>
        <button onClick={deleteRecipe}> 🗑️</button>
    </div>
  )
};

export default RecipeItem;