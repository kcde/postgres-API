/* Replace with your SQL commands */

CREATE TABLE categories (id SERIAL PRIMARY KEY, name VARCHAR UNIQUE );

INSERT INTO categories (name) VALUES ('men') ;
INSERT INTO categories (name) VALUES ('women');
INSERT INTO categories (name) VALUES ('children');