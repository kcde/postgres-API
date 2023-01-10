/* Replace with your SQL commands */

CREATE TABLE products (id SERIAL PRIMARY KEY, name VARCHAR, price MONEY, category_id integer REFERENCES categories(id) );
