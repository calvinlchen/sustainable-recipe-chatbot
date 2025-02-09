class Recipe:
  def __init__(self, name, steps, ingredient_dictionary):
      self.name = name
      self.steps = steps
      self.ingredient_dictionary = ingredient_dictionary

  def get_ingredients_with_quantity(self):
    return [ingredient.report_with_quantity(quantity)
            for ingredient, quantity in self.ingredient_dictionary.items()]