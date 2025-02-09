const express = require('express');
const cors = require('cors');
const { generateRecipe } = require('./recipeGenerator');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/generate-recipe', async (req, res) => {
    const { dietChoice, budget, dietRestrictions, dietGoal } = req.body;
    
    const recipe = await generateRecipe(dietChoice, budget, dietRestrictions, dietGoal);

    res.json({
        message: "Recipe generated successfully!",
        data: { dietChoice, budget, dietRestrictions, dietGoal, recipe },
    });
});

app.listen(5001, () => console.log('Server is running on port 5001'));
