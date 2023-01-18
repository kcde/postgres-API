/* Replace with your SQL commands */
CREATE TABLE orders (id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES users(id), order_status VARCHAR, CHECK (order_status= 'active' OR order_status = 'complete'));

INSERT INTO orders (user_id, order_status) VALUES (1, 'active');
INSERT INTO orders (user_id, order_status) VALUES (1, 'active');



