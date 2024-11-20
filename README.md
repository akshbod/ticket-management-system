# Ticket Management System API

A comprehensive Ticket Management System API built with Node.js, Express, and PostgreSQL.

## Features
- User creation with hashed passwords
- JWT-based authentication and authorization
- Ticket management (create, assign users, view details, and analytics)
- Input validation and constraints enforcement
- Modular and maintainable codebase

## Prerequisites
- [Node.js](https://nodejs.org/) (version 14.x or higher) installed
- A PostgreSQL database created for the project

## Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/akshbod/ticket-management-system.git
cd ticket-management-system

# 2. Install dependencies
npm install

# 3. Set up environment variables
# Copy the env.example file to .env and configure it with your local environment variables
cp env.example .env

# **Important**: For security reasons, I cannot share my personal database credentials. Please use your own PostgreSQL instance and configure the credentials in the .env file.
# Use the provided pgQuery.sql file to create the necessary tables for the application.

# 4. Start the server
npm start

# 5. Access the API documentation
# Open http://localhost:8001/api-docs in your browser
```

### Technologies Used

- Node.js: Backend runtime environment.
- Express: Web framework for building APIs.
- PostgreSQL: Relational database for data storage.
- JWT: For authentication and authorization.
- Swagger: For API documentation.

#### API Endpoints

##### User Routes
1. **POST /users**  
   **Description:** Create a new user.  
   **Request Body:**  
   ```json
   {
     "username": "string",
     "password": "string",
     "email": "string"
   }
   ```
   
2. **POST /auth/login**  
   **Description:** Authenticate a user and return a JWT.  
   **Request Body:**
   ```json
    {
      "username": "string",
      "password": "string"
    }
   ```
##### Ticket Routes
1. **POST /tickets**  
   **Description:** Create a new ticket.
   **Request Body:**
   ```json
    {
      "title": "string",
      "description": "string",
      "priority": "string",
      "status": "string"
    }
   ```
2. **POST /tickets/assign**  
   **Description:** Assign a user to a ticket.
   **Request Body:**
   ```json
    {
      "ticketId": "number",
      "userId": "number"
    }
   ```
3. **GET /tickets/**  
   **Description:** Get ticket details by ticket ID.
   **URL Params:**
    ```
    id: Ticket ID (number)
    ```
4. **GET /tickets/analytics**  
   **Description:** View analytics for past tickets.
   **URL Params:**
    ```json
    {
      "start_date": "YYYY-MM-DD (optional)",
      "end_date": "YYYY-MM-DD (optional)"
    }
    ```


