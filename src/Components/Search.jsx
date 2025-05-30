import {useState} from "react";

const Search = ({allRecipes}) => {
  const [query, setQuery] = useState("")
  const [filteredRecipes, setFilteredRecipes] = useState([])

   const fetchFromAPI = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/recipes/search?q=${query}`);
      const data = await response.json();
      setFilteredRecipes(data.recipes && data.recipes.length > 0 ? data.recipes : []);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setFilteredRecipes([]);
    }
  };
   const handleSearch = () => {
    if (!query.trim()) return;

    if (Array.isArray(allRecipes) && allRecipes.length > 0) {
      const filtered = allRecipes.filter(recipe =>
        recipe.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredRecipes(filtered);
    } else {
      fetchFromAPI();
    }
  };

  return (
    <div>
     <h2>Search for Recipe</h2>
     <input
     type="text"
     placeholder="Enter Recipe Name..."
     value={query}
     onChange={(e) => setQuery(e.target.value)}
     
     />
     <button onClick={handleSearch}>Search</button>

     <ul>
      {filteredRecipes.map((recipe) => (
        <li key={recipe.id}>
          <h3>{recipe.name}</h3>
          <img src={recipe.image}/>
           <p><strong>Ingredients:</strong></p>
            <ul>
              {recipe.ingredients.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p><strong>Instructions:</strong></p>
            <ol>
              {Array.isArray(recipe.instructions)
                ? recipe.instructions.map((step, i) => <li key={i}>{step}</li>)
                : <li>No instructions available.</li>}
            </ol>

        </li>
      ))}
     </ul>

    </div>
  )


};

export default Search;