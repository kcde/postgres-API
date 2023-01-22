# Storfront API

An API for an ecommerce that allows basic CRUD operations and authentication

Please make sure to read this documentation

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_NAME=storefront`

`DB_TEST=storefront_test`

`POSTGRES_USER=postgres`

`POSTGRES_PASSWORD=postgres`

`POSTGRES_HOST=localhost`

`JWT_PRIVATE_KEY="keep a secret`

`SALT_ROUNDS=10`

`ENV=dev`

## Local Set up

Before the project can be succefully run locally, we need to set up some tools in our local machine

#### Docker

Docker needs to be installed in your local machine. Docker is used to run the container what holds the database environment, whic is postgres.

[Download Docker](https://www.docker.com/)

Once we have docker installed, open it up and start the docker engine.

Open up the project folder in the terminal

```bash
  cd postgres-API
```

Run this command to pull the postgres docker image and start the container in silent mode.

```bash
docker compose up -d
```

This should set up postgres based on the `docker-compose.yml` file in the project folder

## Database port

The postgres database will run on the default port of `:5432`

Please make sure no other application or instance of postgres is using this port.

## Database tables

Now we need to setup our databases.
you will need two for this project -

1. storefront

This is the main database

2. storefront_test

This is the database for test

To create these databases, we need to open psql in the running container.

Run

```bash
docker ps
```

to see the container id of the running container

Copy the container iD and run this command

```bash
docker exec -it <container iD>  bash
```

We should now be able to run commands in the container

Enter into psql with the default `postgres` user

```bash
psql -U postgres
```

Create the databases

```bash
CREATE DATABASE storefront
CREATE DATABASE storefront_test
```

## Run Locally

Go to the project directory

```bash
  cd postgres-API
```

Install dependencies

```bash
  npm install
```

Migrate database

```bash
db-migrate up
```

Start the server

```bash
  npm run watch
```

## Running Tests

To run tests, run the following command

```bash
  ENV=test npm run test
```

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
