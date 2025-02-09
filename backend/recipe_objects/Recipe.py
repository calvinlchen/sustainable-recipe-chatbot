class Recipe:
  def __init__(self, name, steps, ingredientMap):
      self.name = name
      self.steps = steps
      self.ingredientMap = ingredientMap

  def getIngredientsWithQuantity(self):
    return [f"{quantity} of {ingredient}"
            for ingredient, quantity in self.ingredientMap.items()]