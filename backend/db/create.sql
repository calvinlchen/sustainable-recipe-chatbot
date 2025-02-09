CREATE TABLE recipe (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    instructions TEXT NOT NULL
);

CREATE TABLE ingredient (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    price FLOAT NOT NULL
);

CREATE TABLE recipe_ingredient (
   recipe_id INT REFERENCES recipes(id) ON DELETE CASCADE,
   ingredient_id INT REFERENCES ingredients(id) ON DELETE CASCADE,
   quantity VARCHAR(50) NOT NULL, -- E.g., "2 cups", "1 tsp"
   PRIMARY KEY (recipe_id, ingredient_id)
);
