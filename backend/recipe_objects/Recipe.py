class Recipe:
  def __init__(self, name, steps, ingredient_map):
      self.name = name
      self.steps = steps
      self.ingredientMap = ingredient_map

  def get_ingredients_with_quantity(self):
    return [f"{quantity} of {ingredient}"
            for ingredient, quantity in self.ingredientMap.items()]