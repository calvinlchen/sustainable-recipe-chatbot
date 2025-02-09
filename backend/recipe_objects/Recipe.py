class Recipe:
  def __init__(self, name, steps, ingredient_map):
      self.name = name
      self.steps = steps
      self.ingredientMap = ingredient_map

  def get_ingredients_with_quantity(self):
    return [ingredient.report_with_quantity(quantity)
            for ingredient, quantity in self.ingredientMap.items()]