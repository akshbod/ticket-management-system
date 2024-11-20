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
# **Important**: For security reasons, I cannot share my personal database credentials. Please use your own PostgreSQL instance and configure the credentials in the .env file.
cp env.example .env

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
