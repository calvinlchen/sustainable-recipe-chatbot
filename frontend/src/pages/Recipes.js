// RecipesPage.js
import React, { useState, useEffect } from "react";
import "../App.css"; // Make sure App.css contains your provided styling

export default function RecipesPage() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5001/api/recipes-singleton")
        .then((response) => response.json())
        .then((data) => {
            // Ensure that recipes is an array; fallback to an empty array if undefined.
            setRecipes(data.recipes || []);
            setLoading(false);
        })
        .catch((err) => {
            console.error("Error fetching recipes:", err);
            setError("Failed to fetch recipes.");
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className="App">
                <h1>Loading recipes...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="App">
                <h1>{error}</h1>
            </div>
        );
    }

    return (
        <div className="App">
            <h1>All Recipes</h1>
            {recipes.length === 0 ? (
                <p>No recipes available.</p>
            ) : (
                recipes.map((recipe, index) => (
                    <div key={index} className="recipe-card">
                        <h2>{recipe.name}</h2>
                        <h3>Steps:</h3>
                        <ol>
                            {recipe.steps && recipe.steps.map((step, idx) => (
                                <li key={idx}>{step}</li>
                            ))}
                        </ol>
                        <h3>Ingredients:</h3>
                        <table className="recipe-table">
                            <thead>
                            <tr>
                                <th>Ingredient</th>
                                <th>Quantity</th>
                                <th>Unit</th>
                                <th>Price</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Object.entries(recipe.ingredientDictionary || {}).map(
                                ([ingredientName, details], idx) => (
                                    <tr key={idx}>
                                        <td>{ingredientName}</td>
                                        <td>{details.quantity}</td>
                                        <td>{details.unit}</td>
                                        <td>${details.price}</td>
                                    </tr>
                                )
                            )}
                            </tbody>
                        </table>
                    </div>
                ))
            )}
        </div>
    );
}
