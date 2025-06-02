import React, { useState } from "react";
import RecipeItem from "./RecipeItem";

const Search = ({recipes}) => {
  const[searchTerm, setSearchTerm]= useState('');
  const[filteredRecipes, setFilteredRecipes]= useState([]);

  function handleSearchChange(event) {
    const value = event.target.value
    setSearchTerm(value);

    if(!Array.isArray(recipes)) {
      setFilteredRecipes([]);
      return;
    }


  //filter recipes based on ingredients
  if (value.trim() === '') {
    setFilteredRecipes([]);
  } else {
    const filtered = recipes.filter(recipe => {
      if (!recipe || !Array.isArray(recipe.ingredients)) {
        return false
      }
       return recipe.ingredients.some(ingredient => {
        if( typeof ingredient !== 'string') {
          return false
        }
        return ingredient.toLowerCase().includes(value.toLowerCase())
       });
    });
      setFilteredRecipes(filtered)
  }
}
  return (
    <div>
      <h2>Search Recipes by Ingredient</h2>
      <input
      type="text"
      value={searchTerm}
      placeholder="Enter ingredient to search..."
      onChange={handleSearchChange}
      />
      <div>
        {Array.isArray(filteredRecipes) && filteredRecipes.length > 0 ? (
          filteredRecipes.map(recipe => (
            <RecipeItem key={recipe.id} recipe={recipe} />
          ))
        ) : (
          searchTerm.trim() !== '' && <p>No recipe found with that ingredient</p>
        )
      }
      </div>
    </div>

  )
};

export default Search;