// Ingredient.js

// Define a set of valid units.
// You can adjust this array as needed.
const VALID_UNITS = ["lb", "oz", "cups", "tablespoon", "teaspoon"];

class Ingredient {
  /**
   * @param {string} name - The name of the ingredient.
   * @param {number} price - The price per unit of the ingredient.
   * @param {string} unit - The measuring unit (e.g., "lb", "cups").
   */
  constructor(name, price, unit) {
    this.name = name;
    this.price = price;
    this.unit = unit;
  }

  /**
   * Returns a string reporting the quantity with unit and name.
   * @param {number} quantity
   * @returns {string}
   */
  reportWithQuantity(quantity) {
    return `${quantity} ${this.unit} of ${this.name}`;
  }

  /**
   * Converts the Ingredient object into a plain object (for JSON serialization).
   * @returns {Object}
   */
  toDict() {
    return {
      name: this.name,
      price: this.price,
      unit: this.unit
    };
  }

  /**
   * Create an Ingredient object from a plain object.
   * @param {Object} data
   * @returns {Ingredient}
   */
  static fromDict(data) {
    return new Ingredient(data.name, data.price, data.unit);
  }

  /**
   * Calculates the total cost for the given quantity.
   * @param {number} quantity
   * @returns {number}
   */
  getCost(quantity) {
    return Math.round(this.price * quantity * 100) / 100;
  }

  /**
   * Returns a string representation of the Ingredient.
   * @returns {string}
   */
  represent() {
    return `Ingredient(name='${this.name}', price=${this.price})`;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    if (typeof name === "string" && name.trim().length > 0) {
      this.name = name;
    } else {
      throw new Error("Invalid ingredient name.");
    }
  }

  getPrice() {
    return this.price;
  }

  setPrice(price) {
    if (typeof price === "number" && price >= 0) {
      this.price = price;
    } else {
      throw new Error("Price must be a non-negative number.");
    }
  }

  getUnit() {
    return this.unit;
  }

  setUnit(unit) {
    if (VALID_UNITS.includes(unit)) {
      this.unit = unit;
    } else {
      throw new Error(`Invalid unit. Choose from: ${VALID_UNITS.join(", ")}`);
    }
  }
}

// Export the VALID_UNITS as a property if needed elsewhere.
Ingredient.VALID_UNITS = VALID_UNITS;

module.exports = Ingredient;
