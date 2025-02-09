// Recipe.js

const Ingredient = require("./Ingredient");

class Recipe {
  /**
   * @param {string} name - The name of the recipe.
   * @param {Array<string>} steps - An array of instructions/steps.
   * @param {Object} ingredientDictionary - An object mapping ingredient names to their details.
   *        Each key is an ingredient name and the value is an object like:
   *        { quantity: number, price: number, unit: string }
   */
  constructor(name, steps, ingredientDictionary) {
    this.name = name;
    this.steps = steps;
    this.ingredientDictionary = ingredientDictionary;
  }

  /**
   * Returns an array of strings, each describing an ingredient with its quantity.
   * @returns {Array<string>}
   */
  getIngredientsWithQuantity() {
    const result = [];
    // Iterate over each key in the ingredientDictionary.
    for (const ingredientName in this.ingredientDictionary) {
      if (Object.prototype.hasOwnProperty.call(this.ingredientDictionary, ingredientName)) {
        const ingData = this.ingredientDictionary[ingredientName];
        // Reconstruct an Ingredient instance from the data.
        const ingredient = new Ingredient(ingredientName, ingData.price, ingData.unit);
        result.push(ingredient.reportWithQuantity(ingData.quantity));
      }
    }
    return result;
  }

  /**
   * Converts the Recipe object into a plain object suitable for JSON serialization.
   * @returns {Object}
   */
  toDict() {
    // The ingredient_dictionary is already in a JSON-friendly format.
    return {
      name: this.name,
      steps: this.steps,
      ingredient_dictionary: this.ingredientDictionary
    };
  }

  /**
   * Creates a Recipe instance from a plain object.
   * @param {Object} data
   * @returns {Recipe}
   */
  static fromDict(data) {
    // data.ingredient_dictionary is assumed to be an object mapping ingredient names
    // to { quantity, price, unit }.
    return new Recipe(data.name, data.steps, data.ingredient_dictionary);
  }
}

module.exports = Recipe;
