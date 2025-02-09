const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function generateRecipe(dietChoice, budget, dietRestrictions, dietGoal) {
    const prompt = `You are tasked with creating three recipes for a given person. The recipes must be chosen such that a subsequent recipe uses 
        leftover ingredients from a previous recipe, leaving the least amount of ingredient waste. The person you are creating the recipes for has listed important dietary information and preferences. 
        Based on the information, you must also select eco-friendly ingredients (i.e. ingredients that are in season, locally sourced, etc.). The users preferences are as follows. If none is entered, just ignore it:
        - Diet Choice: ${dietChoice}
        - Budget: ${budget}
        - Diet Restrictions: ${dietRestrictions}
        - Diet Goal: ${dietGoal};`;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4-turbo",  
            messages: [{ role: "user", content: prompt }],
            max_tokens: 4096,
        });
        console.log(response.choices?.[0]?.message?.content?.trim());

        return response.choices?.[0]?.message?.content?.trim() || "Recipe generation failed.";
    } catch (error) {
        console.error("Error generating recipe:", error);
        return "Failed to generate recipe.";
    }
}

module.exports = { generateRecipe };
