CREATE TABLE IF NOT EXISTS participant(
    id SERIAL PRIMARY KEY,
    ip INET,
    is_admin BOOLEAN DEFAULT FALSE,
    name VARCHAR(200) NOT NULL,
    country VARCHAR(250) NOT NULL,
    is_it BOOLEAN,
    is_positive BOOLEAN
);