// recipe_objects/UserRecipeManager.js

const fs = require('fs');
const path = require('path');
const Recipe = require('./Recipe');
const Ingredient = require('./Ingredient');

class UserRecipeManager {
  constructor() {
    // Define the data file location; adjust the path if needed.
    this.dataFile = path.join(__dirname, '..', 'data', 'recipes.json');
    this.recipeList = [];
    this.ingredientList = [];
    this.loadData();
  }

  /**
   * Adds a Recipe object to the recipeList if it doesn't already exist by name,
   * and also adds its ingredients.
   * @param {Recipe} recipe
   */
  addRecipeToList(recipe) {
    if (!(recipe instanceof Recipe)) return;

    // Check if a recipe with the same name already exists.
    if (!this.recipeList.some(existingRecipe => existingRecipe.name === recipe.name)) {
      this.recipeList.push(recipe);

      // Loop through each ingredient in the recipe and add it.
      for (const ingredientName in recipe.ingredientDictionary) {
        if (Object.prototype.hasOwnProperty.call(recipe.ingredientDictionary, ingredientName)) {
          const ingData = recipe.ingredientDictionary[ingredientName];
          // Create an Ingredient instance.
          const ingredient = new Ingredient(ingredientName, ingData.price, ingData.unit);
          this.addIngredientToList(ingredient);
        }
      }

      // Save the updated data.
      this.saveData();
    } else {
      console.log(`Recipe '${recipe.name}' already exists in the list.`);
    }
  }

  /**
   * Adds an Ingredient object to the ingredientList if it doesn't already exist by name.
   * @param {Ingredient} ingredient
   */
  addIngredientToList(ingredient) {
    if (!(ingredient instanceof Ingredient)) return;

    if (!this.ingredientList.some(existingIngredient => existingIngredient.name === ingredient.name)) {
      this.ingredientList.push(ingredient);
      this.saveData();
    } else {
      console.log(`Ingredient '${ingredient.name}' already exists in the list.`);
    }
  }

  /**
   * Saves recipes and ingredients to a JSON file.
   */
  saveData() {
    // Convert recipes and ingredients to JSON-friendly objects using toDict() methods.
    const data = {
      recipes: this.recipeList.map(recipe => recipe.toDict()),
      ingredients: this.ingredientList.map(ingredient => ingredient.toDict())
    };

    // Ensure the directory exists (it creates the directory if it doesn't exist).
    fs.mkdirSync(path.dirname(this.dataFile), { recursive: true });

    // Write the JSON data to the file.
    fs.writeFileSync(this.dataFile, JSON.stringify(data, null, 4), 'utf8');
    console.log('Data saved successfully.');
  }

  /**
   * Loads recipes and ingredients from a JSON file, if it exists.
   */
  loadData() {
    if (fs.existsSync(this.dataFile)) {
      try {
        const fileData = fs.readFileSync(this.dataFile, 'utf8');
        const data = JSON.parse(fileData);

        // Convert plain objects back into Recipe and Ingredient instances.
        this.recipeList = (data.recipes || []).map(recipeData => Recipe.fromDict(recipeData));
        this.ingredientList = (data.ingredients || []).map(ingData => Ingredient.fromDict(ingData));
        console.log('Data loaded successfully.');
      } catch (error) {
        console.error('Error loading data:', error);
      }
    }
  }

  getAllRecipes() {
    return this.recipeList;
  }

  // Other methods for adding recipes/ingredients would go here...
}

module.exports = UserRecipeManager;
