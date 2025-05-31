# Recipe Sharing App
The Recipe sharing App, is a single-page React application that allows users to browse, create, and choose favourite recipes using a public API. 

In this App, users can sign in to access protected routes for adding recipes, favoriting recipes, and viewing their profile.  

The App is built with React, featuring user authentication, Recipe management and intergration with TheMealDB API.

## Features
- Allows users to browse Recipes

- users can search for a recipe

- Profile, add-recipe, favorites, edit-recipe,id, and my-recipesUser routes have an authentication

- Allows users to create Recipes

- Has favorites System

- Users can manage Recipes

- Has a responsive design


## Development Stack

1. React with Vite

2. React Router DOM

3. React Hooks (useState, useEffect)

4. CSS

5. Use Firebase authentication

6. API: TheMealDB for recipes

7. Deployment: Netlify



## Authentication System
- The app uses Firebase Authentication for secure user management

- For registration new users can create accounts with email/password

- To login existing users authenticate with their credentials

- For protected routes certain features require authentication

- User sessions persist across browser sessions

## UI/UX Design
- A clean Interface with minimalist design focused on recipe content

- Responsive Layout that is optimized for desktop

- Food-Themed colors that are warm and appetizing 

- Organized recipe cards with consistent spacing

- Clear menu structure 

#### API Rate Limiting

- TheMealDB has usage limits; implement request caching if needed

#### Authentication Errors

- Verify Firebase configuration in .env file

- Check Firebase console for authentication settings


### Deployment

The project will be deployed to Netlify

## License
- This project is licensed under the MIT License



