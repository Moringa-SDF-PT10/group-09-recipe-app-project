import React from 'react';
const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <a href="/">Recipe App</a>
        </div>
        <nav className="navigation">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/recipes">Recipes</a></li>
            <li><a href="/categories">Categories</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
