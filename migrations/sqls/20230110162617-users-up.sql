/* Replace with your SQL commands */
CREATE TABLE users (id SERIAL PRIMARY KEY, first_name VARCHAR, last_name VARCHAR, password TEXT);
ALTER TABLE users
ADD COLUMN
username VARCHAR UNIQUE;


INSERT INTO users (username,password) VALUES ('user1','password1');