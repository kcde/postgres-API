/* Replace with your SQL commands */

CREATE TABLE products (id SERIAL PRIMARY KEY, name VARCHAR, price MONEY, category_id integer REFERENCES categories(id) );

INSERT INTO products (name,price,category_id) VALUES ('checkered shirt','200', 1);
INSERT INTO products (name,price,category_id) VALUES ('white bluse','500', 2);
INSERT INTO products (name,price,category_id) VALUES ('chinos','50', 1);
INSERT INTO products (name,price,category_id) VALUES ('small shoe','400', 3);
INSERT INTO products (name,price,category_id) VALUES ('belt','3200', 1);
INSERT INTO products (name,price,category_id) VALUES ('jean shirt','200', 2);
INSERT INTO products (name,price,category_id) VALUES ('hair tie','200', 2);
INSERT INTO products (name,price,category_id) VALUES ('loafers','70000', 1);

