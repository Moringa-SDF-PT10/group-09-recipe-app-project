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

