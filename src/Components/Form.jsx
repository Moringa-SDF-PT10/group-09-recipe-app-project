import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Form = ({onUpdateRecipe, editingRecipe, onAddRecipe}) => {
  const[submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const [isCustomRecipe, setIsCustomRecipe] = useState(false)
  const [formData, setFormData] = useState ({
    name: '',
    ingredients: '',
    instructions: '',
    image: '',
    prepTimeMinutes: '',
    cookTimeMinutes: '',
    servings: '',
    difficulty: '',
    cuisine: '',
    caloriesPerServing: '',
    tags: '',
    mealType: ''
  });
  // effect to populate the formdata when editingRecipe changes
  useEffect(() => {
  if (editingRecipe) {
    setFormData({
      name: editingRecipe.name || '',
      ingredients: Array.isArray(editingRecipe.ingredients)
        ? editingRecipe.ingredients
        : editingRecipe.ingredients.split(',').map(item => item.trim()).filter(item => item !== ''),
      instructions: Array.isArray(editingRecipe.instructions)
        ? editingRecipe.instructions
        : editingRecipe.instructions.split('.').map(item => item.trim()).filter(item => item !== ''),
      image: editingRecipe.image || 'https://cdn.dummyjson.com/recipe-images/1.webp',
      prepTimeMinutes: parseInt(editingRecipe.prepTimeMinutes) || 30,
      cookTimeMinutes: parseInt(editingRecipe.cookTimeMinutes) || 45,
      servings: parseInt(editingRecipe.servings) || 4,
      difficulty: editingRecipe.difficulty || "Medium",
      cuisine: editingRecipe.cuisine || "International",
      caloriesPerServing: parseInt(editingRecipe.caloriesPerServing) || 300,
      tags: Array.isArray(editingRecipe.tags)
        ? editingRecipe.tags
        : editingRecipe.tags.split(',').map(item => item.trim()),
      userId: 1,
      rating: editingRecipe.rating || 0,
      reviewCount: editingRecipe.reviewCount || 0,
      mealType: Array.isArray(editingRecipe.mealType)
        ? editingRecipe.mealType
        : editingRecipe.mealType.split(',').map(item => item.trim()),
    });
  } else {
    setFormData({
      name: '',
      ingredients: '',
      instructions: '',
      image: '',
      prepTimeMinutes: '',
      cookTimeMinutes: '',
      servings: '',
      difficulty: '',
      cuisine: '',
      caloriesPerServing: '',
      tags: '',
      mealType: ''
    });
  }
}, [editingRecipe]);

   // function for input changes
   function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(e) {
  e.preventDefault();
  setSubmitting(true);

  const recipeData = {
    name: formData.name,
    ingredients: formData.ingredients.split(',').map(item => item.trim()).filter(Boolean),
    instructions: formData.instructions.split('.').map(item => item.trim()).filter(Boolean),
    image: formData.image || 'https://cdn.dummyjson.com/recipe-images/1.webp',
    prepTimeMinutes: parseInt(formData.prepTimeMinutes) || 30,
    cookTimeMinutes: parseInt(formData.cookTimeMinutes) || 45,
    servings: parseInt(formData.servings) || 4,
    difficulty: formData.difficulty || "Medium",
    cuisine: formData.cuisine || "International",
    caloriesPerServing: parseInt(formData.caloriesPerServing) || 300,
    tags: formData.tags ? formData.tags.split(',').map(item => item.trim()) : ["Homemade"],
    userId: 1,
    rating: 0,
    reviewCount: 0,
    mealType: formData.mealType ? formData.mealType.split(',').map(item => item.trim()) : ["Dinner"]
  };

  // 👇 if it's a custom recipe, skip the API and handle locally
  if (isCustomRecipe) {
    onAddRecipe(recipeData);
    resetFormAndRedirect();
  } else {
    const method = editingRecipe ? "PATCH" : "POST";
    const url = editingRecipe
      ? `https://dummyjson.com/recipes/${editingRecipe.id}`
      : 'https://dummyjson.com/recipes/add';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipeData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        editingRecipe ? onUpdateRecipe(data) : onAddRecipe(data);
        resetFormAndRedirect();
      })
      .catch(error => {
        console.error("Error adding recipe:", error);
        setSubmitting(false);
        navigate('/recipes');
        alert('Error adding recipe. Please try again.');
      });
  }
}

function resetFormAndRedirect() {
  setFormData() ;
  setSubmitting(false);
  alert('Recipe added successfully!');
}


  return (
    <div>
      <h2>{editingRecipe ? "Edit Recipe" : "Create New Recipe"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <input type="checkbox"
          checked={isCustomRecipe}
          onChange={() => setIsCustomRecipe(!isCustomRecipe)}
           />
           Is this a custom recipe?
        </label>
        <label>Recipe Name</label>
        <input
          type="text"
          name="name"
          placeholder="What's the name of the dish"
          required
          value={formData.name}
          onChange={handleChange} /> <br />
        <br/>
        <label>Ingredients</label>
        <textarea
          name="ingredients"
          rows={4}
          cols={40}
          placeholder="Ingredients needed (separate with commas)"
          required
          value={formData.ingredients}
          onChange={handleChange}
          >
        </textarea>
        <br/>
        <label>Preparation Time</label>
        <input
          type="number"
          name="prepTimeMinutes"
          placeholder="Preparation Time (in minutes)"
          required
          value={formData.prepTimeMinutes}
          onChange={handleChange}
        />
        <br/>
        <label>Cooking Time</label>
        <input
          type="number"
          name="cookTimeMinutes"
          placeholder="Cooking Time (in minutes)"
          required
          value={formData.cookTimeMinutes}
          onChange={handleChange}
        />
        <br/>
        <label>Servings</label>
        <input
          type="number"
          name="servings"
          placeholder="Number of servings"
          required
          value={formData.servings}
          onChange={handleChange}
        />
        <br/>
        <label>Instructions</label>
        <textarea
          name="instructions"
          rows={6}
          cols={40}
          placeholder="What is the procedure (separate with periods)"
          required
          value={formData.instructions}
          onChange={handleChange}
          >
        </textarea>
        <br/>
        <label>Difficulty</label>
        <select
          name="difficulty"
          required
          value={formData.difficulty}
          onChange={handleChange}
        >
          <option value="">Select Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <br/>
        <label>Cuisine</label>
        <input
          type="text"
          name="cuisine"
          placeholder="e.g., Italian, Chinese, Mexican"
          required
          value={formData.cuisine}
          onChange={handleChange}
        />
        <br/>
        <label>Calories Per Serving</label>
        <input
          type="number"
          name="caloriesPerServing"
          placeholder="Calories Per Serving"
          required
          value={formData.caloriesPerServing}
          onChange={handleChange}
        />
        <br/>
        <label>Tags</label>
        <input
          type="text"
          name="tags"
          placeholder="Tags (separate with commas, e.g., vegetarian, quick, healthy)"
          value={formData.tags}
          onChange={handleChange}
        />
        <br/>
        <label>Meal Type</label>
        <input
          type="text"
          name="mealType"
          placeholder="Meal Type (separate with commas, e.g., breakfast, lunch, dinner)"
          required
          value={formData.mealType}
          onChange={handleChange}
        />
        <br/>
        <label>Image</label>
        <input
          type="text"
          name="image"
          placeholder="Image URL (optional)"
          value={formData.image}
          onChange={handleChange} /> <br />

        <button type="submit" disabled={submitting}>
          {submitting ? 'Adding...' : 'Submit your recipe'}
        </button>
      </form>
      {submitting && <p>Adding recipe...</p>}
    </div>
  );
};

export default Form;
