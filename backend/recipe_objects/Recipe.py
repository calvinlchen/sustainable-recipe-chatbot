from backend.recipe_objects.Ingredient import Ingredient


class Recipe:
  def __init__(self, name, steps, ingredient_dictionary):
      self.name = name
      self.steps = steps
      self.ingredient_dictionary = ingredient_dictionary  # {Ingredient: quantity}

  def get_ingredients_with_quantity(self):
    return [ingredient.report_with_quantity(quantity)
            for ingredient, quantity in self.ingredient_dictionary.items()]

  def to_dict(self):
    """Convert Recipe object to a dictionary for JSON serialization."""
    return {
      "name": self.name,
      "steps": self.steps,
      "ingredient_dictionary": {
        ingredient.name: {"quantity": quantity, "price": ingredient.price, "unit": ingredient.unit}
        for ingredient, quantity in self.ingredient_dictionary.items()
      }
    }

  @classmethod
  def from_dict(cls, data):
    """Create a Recipe object from a dictionary."""
    ingredient_dictionary = {
      Ingredient(name, ing_data["price"], ing_data["unit"]): ing_data["quantity"]
      for name, ing_data in data["ingredient_dictionary"].items()
    }
    return cls(data["name"], data["steps"], ingredient_dictionary)