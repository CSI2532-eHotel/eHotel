/*
* SQL file that contains all the queries from pgAdmin (keep a copy)
*/

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(10) CHECK (role IN ('client', 'employee')) NOT NULL
);