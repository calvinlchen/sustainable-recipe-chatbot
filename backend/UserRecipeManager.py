from backend.recipe_objects.Recipe import Recipe
from backend.recipe_objects.Ingredient import Ingredient


class UserRecipeManager:
  def __init__(self):
    self.recipe_list = []
    self.ingredient_list = []

  def add_recipe_to_list(self, recipe):
    if not isinstance(recipe, Recipe):
      return

    """Adds a recipe object to the list if it doesn't already exist by name."""
    if not any(existing_recipe.name == recipe.name for existing_recipe in self.recipe_list):
      self.recipe_list.append(recipe)
      for ingredient_obj in recipe.ingredient_dictionary.keys():  # Extract ingredient objects
        self.add_ingredient_to_list(ingredient_obj)
    else:
      print(f"Recipe '{recipe.name}' already exists in the list.")

  def add_ingredient_to_list(self, ingredient_obj):
    if not isinstance(ingredient_obj, Ingredient):
      return

    """Adds an ingredient object to the list if it doesn't already exist by name."""
    if not any(existing_ingredient.get_name() == ingredient_obj.get_name() for existing_ingredient in self.ingredient_list):
      self.ingredient_list.append(ingredient_obj)
    else:
      print(f"Ingredient '{ingredient_obj.get_name()}' already exists in the list.")

  def get_all_recipes(self):
    """Returns the list of stored recipes."""
    return self.recipe_list

  def get_all_ingredients(self):
    """Returns the list of stored ingredients."""
    return self.ingredient_list
