const OpenAI = require('openai');
require('dotenv').config();

// Import the UserRecipeManager and Recipe classes
const UserRecipeManager = require('./recipe_objects/UserRecipeManager');
const Recipe = require('./recipe_objects/Recipe');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function generateRecipe(dietChoice, budget, dietRestrictions, dietGoal) {
    const prompt = `You are tasked with creating three recipes for a given person. The recipes must be chosen such that a subsequent recipe uses leftover ingredients from a previous recipe, leaving the least amount of ingredient waste. The person you are creating the recipes for has listed important dietary information and preferences. Based on the information, you must also select eco-friendly ingredients (i.e. ingredients that are in season, locally sourced, etc.). The user's preferences are as follows (if none is entered, just ignore it):
    - Diet Choice: ${dietChoice}
    - Budget: ${budget}
    - Diet Restrictions: ${dietRestrictions}
    - Diet Goal: ${dietGoal}
    
    Please provide your answer in two sections:
    
    1. **Explanation:** A human-readable explanation of the recipes, including details about the ingredients, steps, and how ingredients carry over between recipes.
    
    2. **JSON Output:** A valid JSON object following this exact format (do not include any extra keys or text in this section):
    
    {
      "recipes": [
        {
          "name": "Recipe Name",
          "steps": ["Step 1", "Step 2", "..."],
          "ingredientDictionary": {
             "Ingredient Name": {"quantity": 0, "price": 0.0, "unit": "unit of measurement"}
             // Repeat for each ingredient in the recipe
          }
        }
        // Repeat for additional recipes
      ]
    }
    
    Make sure the JSON is valid and nothing else is included in the JSON block.
    `;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 4096,
        });

        const fullResponse = response.choices?.[0]?.message?.content?.trim();
        console.log("Full Response:\n", fullResponse);

        let jsonString = null;

        // Try to extract the JSON block using a regex for markdown code fences
        const jsonRegex = /```json\s*([\s\S]*?)\s*```/;
        const match = fullResponse.match(jsonRegex);
        if (match && match[1]) {
            jsonString = match[1];
        } else {
            // Fallback: Try to extract from the first "{" to the last "}"
            const startIndex = fullResponse.indexOf('{');
            const lastIndex = fullResponse.lastIndexOf('}');
            if (startIndex !== -1 && lastIndex !== -1 && lastIndex > startIndex) {
                jsonString = fullResponse.substring(startIndex, lastIndex + 1);
            }
        }

        // Extract JSON from the response.
        let recipeData = null;
        if (jsonString) {
            try {
                recipeData = JSON.parse(jsonString);
                console.log("Parsed JSON Data:", recipeData);
            } catch (jsonError) {
                console.error("Error parsing extracted JSON:", jsonError);
            }
        } else {
            console.error("No JSON block found in the response.");
        }

        // If valid recipe data is available, convert it into Recipe objects and save it.
        if (recipeData && recipeData.recipes && recipeData.recipes.length > 0) {
            // For example, we add the first recipe in the array.
            const recipeObj = Recipe.fromDict(recipeData.recipes[0]);

            // Instantiate a UserRecipeManager (or use a singleton instance if desired)
            const userRecipeManager = new UserRecipeManager();

            // Save the recipe to the manager
            userRecipeManager.addRecipeToList(recipeObj);
            console.log("Recipe added to UserRecipeManager.");
        } else {
            console.error("No recipes found in parsed JSON data.");
        }

        return fullResponse || "Recipe generation failed";

    } catch (error) {
        console.error("Error generating recipe:", error);
        return "Failed to generate recipe.";
    }
}

module.exports = { generateRecipe };
