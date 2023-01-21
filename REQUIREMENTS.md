# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

### Database Schema

#### Users table

| id        | username  | first_name | last_name |
| :-------- | :-------- | :--------- | :-------- |
| `integer` | `VARCHAR` | `VARCHAR`  | `VARCHAR` |

#### Products table

| id        | name      | category(fkey) |
| :-------- | :-------- | :------------- |
| `integer` | `VARCHAR` | `integer`      |

#### Categories table

| id        | name      |
| :-------- | :-------- |
| `integer` | `VARCHAR` |

#### orders table

| user_id(fkey) | order_status |
| :------------ | :----------- |
| `integer`     | `VARCHAR`    |

#### carts table

| product_id(fkey) | order_id (fkey) | quantity  |
| :--------------- | :-------------- | :-------- |
| `integer`        | `integer`       | `integer` |

## API Endpoints

#### Products

- Index
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category)

#### Users

- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders

- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

## API Reference

### users route

### Products route

#### Get all products

```http
  GET /api/products
```

Returns all products in the database

#### Get all products by category

```http
  GET /api/products?category={category}
```

Returns all products that matches the the category query

#### Get a product

```http
  GET /api/products/{id}
```

Returns a product using the id parameter

!! Requires token in the request headers object.

#### Create product

```http
  POST /api/products
```

Creates a product. Pass an object with the name and price key value pair;

| Body    | Type     | Description          |     |
| :------ | :------- | :------------------- | :-- |
| `name`  | `string` | Name of the product  |     |
| `price` | `number` | price of the product |     |

### Users route

#### Get users

```http
  GET /api/users/
```

Returns all users

!! Requires token in the request headers object.

#### Get user

```http
  GET /api/users/{userId}
```

Returns a user with the {userId} key

!! Requires token in the request headers object.

#### Create user

```bash
  POST /api/users/
```

Create a new user with the info in request body

| Body       | Type     | Description     |
| :--------- | :------- | :-------------- |
| `username` | `string` | unique username |
| `password` | `string` | user's password |

### Orders route

#### create user order

userid is gotten from the token

```http
POST /api/orders
```

Creates an order with a unique id
!! Requires token in the request headers object.

#### add product to cart

userid is gotten from the token

```http
POST /api/orders/{orderid}
```

| Body         | Type     | Description                |
| :----------- | :------- | :------------------------- |
| `product_id` | `number` | unique product id          |
| `quantity`   | `number` | quantity of product to add |

!! Requires token in the request headers object.

#### Get user order

instead of userId, username is going to be used. And this is gotten from the token

```http
GET /api/orders
```

Returns all the orders by a user;

!! Requires token in the request headers object.
