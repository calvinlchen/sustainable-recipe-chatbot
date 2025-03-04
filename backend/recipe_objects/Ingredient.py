from backend.Unit import Unit

class Ingredient:

    # name is the name of the ingredient
    # price is the price of the ingredient
    # unit is the measuring unit of the ingredient (lb, oz, cups, tablespoon, etc.)
    def __init__(self, name, price, unit):
        self.name = name
        self.price = price
        self.unit = unit

    def report_with_quantity(self, quantity):
        return f"{quantity} {self.unit} of {self.name}"

    def to_dict(self):
        """Convert Ingredient object to a dictionary for JSON serialization."""
        return {
            "name": self.name,
            "price": self.price,
            "unit": self.unit
        }

    @classmethod
    def from_dict(cls, data):
        """Create an Ingredient object from a dictionary."""
        return cls(data["name"], data["price"], data["unit"])

    def get_cost(self, quantity):
        return round(self.price * quantity, 2)
    
    def represent(self):
        return f"Ingredient(name='{self.name}', price={self.price})"
    
    def get_name(self):
        return self.name
    
    def set_name(self, name):
        if isinstance(name, str) and name.strip():
            self.name = name
        else:
            raise ValueError("Invalid ingredient name.")
    
    def get_price(self):
        return self.price
    
    def set_price(self, price):
        if isinstance(price, (int, float)) and price >= 0:
            self.price = price
        else:
            raise ValueError("Price must be a non-negative number.")
        
    def get_unit(self):
        return self.unit
    
    def set_unit(self, unit):
        if unit in Unit.VALID_UNITS:
            self.unit = unit
        else:
            raise ValueError(f"Invalid unit. Choose from: {', '.join(Unit.VALID_UNITS)}")
    

    
