require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai'); // ✅ Correct OpenAI import

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // ✅ No need for Configuration
});

// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json()); // Ensure JSON parsing is enabled

app.post('/api/generate-recipe', async (req, res) => {
    const { dietChoice, budget, dietRestrictions, dietGoal } = req.body;

    const finalDietChoice = dietChoice || "None";
    const finalBudget = budget || "None";
    const finalDietRestrictions = dietRestrictions && dietRestrictions.length ? dietRestrictions : "None";
    const finalDietGoal = dietGoal || "None";

    console.log("Received data:", req.body); // Debug frontend input

    try {
        const prompt = `You are tasked with creating three recipes for a given person. The recipes must be chosen such that a subsequent recipe uses 
        leftover ingredients from a previous recipe, leaving the least amount of ingredient waste. The person you are creating the recipes for has listed important dietary information and preferences. 
        Based on the information, you must also select eco-friendly ingredients (i.e. ingredients that are in season, locally sourced, etc.). The users preferences are as follows. If none is entered, just ignore it:
        - Diet Choice: ${finalDietChoice}
        - Budget: ${finalBudget}
        - Diet Restrictions: ${finalDietRestrictions}
        - Diet Goal: ${finalDietGoal}`;

        console.log("Generated prompt for OpenAI:", prompt); // Debug prompt

        const response = await openai.chat.completions.create({
            model: "gpt-4-turbo",  
            messages: [{ role: "user", content: prompt }],
            max_tokens: 4096,
        });

        console.log("OpenAI Response:", JSON.stringify(response, null, 2)); // Debug API response

        const recipe = response.choices?.[0]?.message?.content?.trim() || "Recipe generation failed.";
        console.log("recipe:",recipe);

        res.json({
            message: "Recipe generated successfully!",
            data: {
                dietChoice,
                budget,
                dietRestrictions,
                dietGoal,
                recipe,
            },
        });

    } catch (error) {
        console.log("Failed to generate prommpt ");
        console.error("Error generating recipe:", error);
        res.status(500).json({
            message: "Failed to generate recipe",
            error: error.message,
        });
    }
});

app.listen(5001, () => {
    console.log('Server is running on port 5001');
});
