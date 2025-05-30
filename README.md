# Recipe Sharing App
This is a  single-page React application that allows users to browse, create, and choose favourite recipes using a public API. Users can sign in to access protected routes for adding recipes, favoriting recipes, and viewing their profile.  

The App is built with React, featuring user authentication, Recipe management and intergration with TheMealDB API.

## Features
- Browse Recipes: Explore a vast collection of recipes from TheMealDB API
- Recipe Search: Find recipes by keyword or category
- User Authentication: Secure login/signup system with protected routes
- Create Recipes: Add your own custom recipes to share with the community
- Favorites System: Save and organize your favorite recipes
- Recipe Management: Edit and manage your created recipes
- Responsive Design: Clean, professional UI that works on all devices

## Tech Stack
1. Frontend: React (with Vite)

2. Routing: React Router DOM

3. State Management: React Hooks (useState, useEffect, etc.)

4. Styling: Tailwind CSS

5. Authentication: Firebase Auth or mock localStorage tokens

6. API: TheMealDB for recipes, optional JSON Server for user-created content

7. Deployment: Netlify



## Authentication System
- The app uses Firebase Authentication for secure user management:

- Registration: New users can create accounts with email/password

- Login: Existing users authenticate with their credentials

- Protected Routes: Certain features require authentication

- Session Management: User sessions persist across browser sessions

## UI/UX Design
- Clean Interface: Minimalist design focused on recipe content

- Responsive Layout: Optimized for desktop, tablet, and mobile devices

- Food-Themed Colors: Warm, appetizing color palette

- Grid System: Organized recipe cards with consistent spacing

- Intuitive Navigation: Clear menu structure and breadcrumbs

## Troubleshooting
### Common Issues
#### API Rate Limiting

- TheMealDB has usage limits; implement request caching if needed

#### Authentication Errors

- Verify Firebase configuration in .env file

- Check Firebase console for authentication settings

#### Build Failures

- Ensure all dependencies are installed: npm install

- Clear cache: npm run dev -- --force

### API

### Deployment

## License
- This project is licensed under the MIT License



## Project Structure
```recipe-sharing-app/
├── public/
│   └── favicon.ico
│
├── src/
│   ├── assets/                     # Static images, icons, etc.
│   │   └── logo.png
│   │
│   ├── components/                # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── RecipeCard.jsx
│   │   ├── RecipeList.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── pages/                     # Route-specific components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Profile.jsx
│   │   ├── Recipes.jsx
│   │   ├── RecipeDetail.jsx
│   │   ├── AddRecipe.jsx
│   │   ├── EditRecipe.jsx
│   │   ├── MyRecipes.jsx
│   │   ├── Favorites.jsx
│   │   └── Search.jsx
│   │
│   ├── context/                   # Context for global state (e.g., Auth)
│   │   └── AuthContext.jsx
│   │
│   ├── services/                  # API service functions
│   │   ├── mealApi.js             # Functions to fetch data from TheMealDB
│   │   └── auth.js                # Firebase or mock auth functions
│   │
│   ├── styles/                    # Global styles or Tailwind customizations
│   │   └── globals.css
│   │
│   ├── App.jsx                    # Root component with routes
│   ├── main.jsx                   # Entry point (Vite)
│   └── config.js                  # API keys or config constants (if needed)
│
├── .env                           # Environment variables (API keys, etc.)
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md```