const { Pool } = require('pg');
require('dotenv').config();

const config = {
    connectionString: process.env.DB_URL,
    ssl: { rejectUnauthorized: false }     
};

const pool = new Pool(config);

// <--- Check DB connection ---> //
pool.connect((err) => {
    if (err) {
        console.error("PostgreSQL connection error:", err);
    } else {
        console.log("Connected to PostgreSQL");
    }
});
// <--- Check DB connection ---> //

module.exports = pool;