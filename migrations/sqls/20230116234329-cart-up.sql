/* Replace with your SQL commands */
 CREATE TABLE carts (product_id INTEGER REFERENCES products(id), order_id INTEGER REFERENCES orders(id), quantity INTEGER);


INSERT INTO carts (product_id,order_id,quantity) VALUES (1,1,5);
