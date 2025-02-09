import json
import os

from backend.recipe_objects.Recipe import Recipe
from backend.recipe_objects.Ingredient import Ingredient


class UserRecipeManager:
  DATA_FILE = "data/recipes.json"  # Define file path

  def __init__(self):
    self.recipe_list = []
    self.ingredient_list = []
    self.load_data()  # Load saved data on initialization

  def add_recipe_to_list(self, recipe):
    if not isinstance(recipe, Recipe):
      return

    """Adds a recipe object to the list if it doesn't already exist by name."""
    if not any(existing_recipe.name == recipe.name for existing_recipe in self.recipe_list):
      self.recipe_list.append(recipe)
      for ingredient_obj in recipe.ingredient_dictionary.keys():  # Extract ingredient objects
        self.add_ingredient_to_list(ingredient_obj)
      self.save_data()
    else:
      print(f"Recipe '{recipe.name}' already exists in the list.")

  def add_ingredient_to_list(self, ingredient_obj):
    if not isinstance(ingredient_obj, Ingredient):
      return

    """Adds an ingredient object to the list if it doesn't already exist by name."""
    if not any(existing_ingredient.get_name() == ingredient_obj.get_name() for existing_ingredient in self.ingredient_list):
      self.ingredient_list.append(ingredient_obj)
      self.save_data()
    else:
      print(f"Ingredient '{ingredient_obj.get_name()}' already exists in the list.")

  def save_data(self):
    """Saves recipes and ingredients to a JSON file."""
    os.makedirs(os.path.dirname(self.DATA_FILE), exist_ok=True)  # Ensure /data directory exists

    data = {
      "recipes": [recipe.to_dict() for recipe in self.recipe_list],
      "ingredients": [ingredient.to_dict() for ingredient in self.ingredient_list]
    }

    with open(self.DATA_FILE, "w") as f:
      json.dump(data, f, indent=4)
    print("Data saved successfully.")

  def load_data(self):
    """Loads recipes and ingredients from a JSON file."""
    if os.path.exists(self.DATA_FILE):
      with open(self.DATA_FILE, "r") as f:
        data = json.load(f)

      self.recipe_list = [Recipe.from_dict(recipe) for recipe in data["recipes"]]
      self.ingredient_list = [Ingredient.from_dict(ingredient) for ingredient in data["ingredients"]]
      print("Data loaded successfully.")

  def get_all_recipes(self):
    """Returns the list of stored recipes."""
    return self.recipe_list

  def get_all_ingredients(self):
    """Returns the list of stored ingredients."""
    return self.ingredient_list
