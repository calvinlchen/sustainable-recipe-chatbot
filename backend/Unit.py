class Unit:

    CONVERSION_RATES = {
        # Volume conversions (US Customary)
        ("teaspoon", "tablespoon"): 1 / 3,
        ("tablespoon", "teaspoon"): 3,
        ("tablespoon", "fluid ounce"): 1 / 2,
        ("fluid ounce", "tablespoon"): 2,
        ("tablespoon", "cup"): 1 / 16,
        ("cup", "tablespoon"): 16,
        ("cup", "fluid ounce"): 8,
        ("fluid ounce", "cup"): 1 / 8,
        ("cup", "pint"): 1 / 2,
        ("pint", "cup"): 2,
        ("pint", "quart"): 1 / 2,
        ("quart", "pint"): 2,
        ("quart", "gallon"): 1 / 4,
        ("gallon", "quart"): 4,
        ("gallon", "cup"): 16,
        ("cup", "gallon"): 1 / 16,

        # Metric volume conversions
        ("liter", "milliliter"): 1000,
        ("milliliter", "liter"): 1 / 1000,
        ("liter", "cup"): 4.22675,  # 1 liter ≈ 4.23 cups
        ("cup", "liter"): 1 / 4.22675,
        ("milliliter", "teaspoon"): 1 / 4.92892,  # 1 teaspoon ≈ 4.93 mL
        ("teaspoon", "milliliter"): 4.92892,
        ("milliliter", "tablespoon"): 1 / 14.7868,  # 1 tablespoon ≈ 14.79 mL
        ("tablespoon", "milliliter"): 14.7868,
        ("milliliter", "fluid ounce"): 1 / 29.5735,  # 1 fl oz ≈ 29.57 mL
        ("fluid ounce", "milliliter"): 29.5735,

        # Weight conversions (US & Metric)
        ("gram", "ounce"): 1 / 28.3495,  # 1 ounce ≈ 28.35 grams
        ("ounce", "gram"): 28.3495,
        ("pound", "ounce"): 16,
        ("ounce", "pound"): 1 / 16,
        ("kilogram", "gram"): 1000,
        ("gram", "kilogram"): 1 / 1000,
        ("kilogram", "pound"): 2.20462,  # 1 kg ≈ 2.2 pounds
        ("pound", "kilogram"): 1 / 2.20462,

        # Converting weight to volume (approximate values for common ingredients)
        ("gram", "teaspoon"): 1 / 5,  # Average density (e.g., flour, sugar)
        ("teaspoon", "gram"): 5,
        ("gram", "tablespoon"): 1 / 15,
        ("tablespoon", "gram"): 15,
        ("gram", "cup"): 1 / 120,
        ("cup", "gram"): 120,

        # Miscellaneous conversions
        ("milligram", "gram"): 1 / 1000,
        ("gram", "milligram"): 1000,
        ("kilogram", "ton"): 1 / 1000,  # Metric ton
        ("ton", "kilogram"): 1000,
    }

    VALID_UNITS = {
        # Volume (US Customary)
        "teaspoon", "tablespoon", "fluid ounce", "cup", "pint", "quart", "gallon",

        # Volume (Metric)
        "milliliter", "liter",

        # Weight (US & Metric)
        "milligram", "gram", "kilogram", "ounce", "pound", "ton",

        # Miscellaneous units
        "piece", "slice", "pinch"
    }
    
    VOLUME_UNITS = {"teaspoon", "tablespoon", "fluid ounce", "cup", "pint", "quart", "gallon", "milliliter", "liter"}
    WEIGHT_UNITS = {"milligram", "gram", "kilogram", "ounce", "pound", "ton"}
    OTHER_UNITS = {"piece", "slice", "pinch"}

    def __init__(self, unit):
        unit = unit.lower()
        unit = self.normalize_unit(unit)
        if unit not in self.VALID_UNITS:
            raise ValueError(f"Invalid unit: {unit}. Choose from {', '.join(self.VALID_UNITS)}.")
        self.unit = unit

    def normalize_unit(self, unit):
        plural_to_singular = {
            "teaspoons": "teaspoon",
            "tablespoons": "tablespoon",
            "fluid ounces": "fluid ounce",
            "cups": "cup",
            "pints": "pint",
            "quarts": "quart",
            "gallons": "gallon",
            "milliliters": "milliliter",
            "liters": "liter",
            "milligrams": "milligram",
            "grams": "gram",
            "kilograms": "kilogram",
            "ounces": "ounce",
            "pounds": "pound",
            "tons": "ton",
            "pieces": "piece",
            "slices": "slice",
            "pinches": "pinch",
        }
        return plural_to_singular.get(unit, unit)
    
    def is_compatible(self, target_unit):
        target_unit = target_unit.lower()
        target_unit = self.normalize_unit(target_unit)
        if target_unit in self.VOLUME_UNITS and self.unit in self.VOLUME_UNITS:
            return True
        if target_unit in self.WEIGHT_UNITS and self.unit in self.WEIGHT_UNITS:
            return True
        if target_unit in self.OTHER_UNITS and self.unit in self.OTHER_UNITS:
            return True
        return False
    
    def convert_to(self, target_unit, quantity):
        target_unit = target_unit.lower()
        target_unit = self.normalize_unit(target_unit)
        if not self.is_compatible(target_unit):
            raise ValueError(f"Cannot convert from {self.unit} to {target_unit}, as they are incompatible units.")
        if (self.unit, target_unit) in self.CONVERSION_RATES:
            return round(quantity * self.CONVERSION_RATES[(self.unit, target_unit)], 2)
        else:
            raise ValueError(f"Conversion from {self.unit} to {target_unit} is not supported.")
        
    def get_category(self):
        if self.unit in self.VOLUME_UNITS:
            return "Volume"
        elif self.unit in self.WEIGHT_UNITS:
            return "Weight"
        else:
            return "Other"
        
    def represent(self):
        return f"Unit('{self.unit}')"
