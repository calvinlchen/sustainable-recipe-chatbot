const express = require('express');
const cors = require('cors');
const { generateRecipe } = require('./recipeGenerator');

const UserRecipeManager = require('./recipe_objects/UserRecipeManager');
const userRecipeManager = new UserRecipeManager();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/recipes-singleton', (req, res) => {
    // If the data might change, and want a fresh read, you can call loadData() again.
    userRecipeManager.loadData();
    const recipes = userRecipeManager.getAllRecipes();
    res.json({ recipes });
});

app.get('/recipes', (req, res) => {
    userRecipeManager.loadData();
    const recipes = userRecipeManager.getAllRecipes();
    res.render('recipes', { recipes });
});

app.post('/api/generate-recipe', async (req, res) => {
    const { dietChoice, budget, dietRestrictions, dietGoal } = req.body;
    
    const recipe = await generateRecipe(dietChoice, budget, dietRestrictions, dietGoal);

    res.json({
        message: "Recipe generated successfully!",
        data: { dietChoice, budget, dietRestrictions, dietGoal, recipe },
    });
});

app.listen(5001, () => console.log('Server is running on port 5001'));
