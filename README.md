# Ecommerce Demo Application

This is a full-stack ecommerce application with separate login pages for admins and customers.

## Features

- Admin login page
- Customer login page
- Product management (add/delete products)
- User authentication with roles

## Backend (Spring Boot)

### Setup

1. Ensure you have Java 17 and Maven installed.
2. Configure your MySQL database in `application.properties`.
3. Run the application: `mvn spring-boot:run`

### API Endpoints

- `POST /auth/login` - Login with email and password
- `POST /auth/register` - Register a new user
- `GET /products` - Get all products
- `POST /products` - Add a new product
- `DELETE /products/{id}` - Delete a product

## Frontend (React)

### Setup

1. Navigate to the `frontend` directory.
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

### Routes

- `/` - Home page with product listing
- `/admin/login` - Admin login page
- `/customer/login` - Customer login page

## Usage

1. Start the backend server.
2. Start the frontend server.
3. Register users with roles "ADMIN" or "CUSTOMER" via `POST /auth/register`.
4. Use the login pages to authenticate.

## Troubleshooting

- Ensure CORS is configured if running on different ports.
- Check database connection in `application.properties`.