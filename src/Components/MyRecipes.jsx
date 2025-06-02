import React from "react";

const MyRecipes = ({ customRecipes = [] }) => {
  if (customRecipes.length === 0) {
    return (
      <div>
        <h1>My Recipes</h1>
        <p>You haven't created any recipes yet. <a href="/Form">Create your first recipe!</a></p>
      </div>
    );
  }
