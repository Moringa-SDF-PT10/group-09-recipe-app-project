# 🍽️ Recipe App (React)
The Recipe sharing App, is a single-page React application that allows users to browse, create, and choose favourite recipes using a public API.

In this App, users can sign in to access protected routes for adding recipes, favoriting recipes, and viewing their profile.

The App is built with React, featuring user authentication, Recipe management and intergration with TheMealDB API.

## 🔧 Features

- 🔐 Authentication (Login/Register)
- 🧾 View all recipes
- ⭐ Mark recipes as favorite
- ✏️ Edit or delete your recipes
- 🌐 Responsive design with React Router



##  Tech Stack


1. React with Vite

2. React Router DOM

3. React Hooks (useState, useEffect)

4. CSS

5. Use local storage authentication system

6. API: TheMealDB for recipes

7. Deployment: Netlify



## Authentication System
- The app uses local storage authentication system to secure user management

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

## API Rate Limiting

- TheMealDB has usage limits; implement request caching if needed


## Deployment

The project will be deployed to Netlify. Copy the following url to your browser
```bash
    rad-banoffee-f2316d.netlify.app
```

## License
- This project is licensed under the MIT License



