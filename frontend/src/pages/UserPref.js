import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserPref() {
  const [dietChoice, setDietChoice] = useState("");
  const [budget, setBudget] = useState("");
  const [dietRestrictions, setDietRestrictions] = useState([]);
  const [dietGoal, setDietGoal] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const navigate = useNavigate();

  const handleRestrictionChange = (e) => {
    const value = Array.from(e.target.selectedOptions, (option) => option.value);
    setDietRestrictions(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userPreferences = {
        dietChoice,
        budget,
        dietRestrictions,
        dietGoal,
    };

    try {
        const response = await fetch("http://localhost:5001/api/generate-recipe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userPreferences),
        });

        const data = await response.json();
        console.log("Response from backend:", data);

        if (data.message === "Recipe generated successfully!") {
            navigate("/recipes", { state: { recipeData: data.data } }); // ✅ Fixed case
        }

    } catch (error) {
        console.error("Error submitting preferences:", error);
    }
};


  return (
    <div className="page">
      <h1>⚙️ User Preferences</h1>
      <p>Fill out the form below to set your preferences.</p>

      <form className="form" onSubmit={handleSubmit}>
        <label>Budget:</label>
        <select value={budget} onChange={(e) => setBudget(e.target.value)}>
          <option value="">None</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <label>Dietary Goal:</label>
        <select value={dietGoal} onChange={(e) => setDietGoal(e.target.value)}>
          <option value="">None</option>
          <option value="Maintain Weight">Maintain Weight</option>
          <option value="Gain Weight">Gain Weight</option>
          <option value="Lose Weight">Lose Weight</option>
        </select>

        <label>Dietary Choice:</label>
        <select value={dietChoice} onChange={(e) => setDietChoice(e.target.value)}>
          <option value="">None</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="pescatarian">Pescatarian</option>
          <option value="keto">Keto</option>
          <option value="paleo">Paleo</option>
        </select>

        <label>Dietary Restrictions (Select multiple):</label>
        <select multiple value={dietRestrictions} onChange={handleRestrictionChange}>
          <option value="gluten-free">Gluten-Free</option>
          <option value="lactose-free">Lactose-Free</option>
          <option value="nut-free">Nut-Free</option>
          <option value="halal">Halal</option>
          <option value="kosher">Kosher</option>
        </select>

        <p><strong>Selected Budget:</strong> {budget || "None"}</p>
        <p><strong>Selected Goal:</strong> {dietGoal || "None"}</p>
        <p><strong>Selected Diet:</strong> {dietChoice || "None"}</p>
        <p><strong>Selected Restrictions:</strong> {dietRestrictions.length ? dietRestrictions.join(", ") : "None"}</p>

        <button type="submit">Submit</button>
      </form>
      
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}
