
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
    createdby INTEGER REFERENCES users(id),
    createddate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(50),
    venue VARCHAR(100),
    status VARCHAR(20),
    priority VARCHAR(20),
    due_date TIMESTAMP,
    created_by INTEGER REFERENCES users(id),
    createddate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    assigned_users VARCAHR(500),
    lastmodifiedby INTEGER REFERENCES users(id),
    lastmodifieddate TIMESTAMP
);
