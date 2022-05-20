CREATE TABLE clients (
    client_id serial PRIMARY KEY,
    client_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone_number INT,
    created TIMESTAMP NOT NULL
);

CREATE TABLE clientNotes(
    client_id INT UNIQUE NOT NULL REFERENCES clients (client_id),
    notes TEXT,
    last_updated TIMESTAMP NOT NULL     
);

CREATE TABLE bicycles(
    bicycle_id serial PRIMARY KEY,
    owner_id int NOT NULL REFERENCES clients (client_id),
    make VARCHAR(255),
    model VARCHAR(255),
    color VARCHAR(255),
    serial_number VARCHAR(50),
    created TIMESTAMP NOT NULL   
);

CREATE TABLE reports(
    report_id serial PRIMARY KEY,
    client_id INT NOT NULL REFERENCES clients (client_id),
    bike_id INT REFERENCES bicycles (bicycle_id),
    service_date TIMESTAMP,
    body TEXT,
    viewable BOOLEAN DEFAULT FALSE,
    report_status INT DEFAULT 0
    created TIMESTAMP NOT NULL,
    last_updated TIMESTAMP NOT NULL
);

CREATE TABLE users(
    user_id serial PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    pass VARCHAR(50) NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    user_role INT DEFAULT NOT NULL 0  
);

INSERT INTO users (username, pass, user_name, user_role)
    VALUES ('Cambo', 'pass', 'Cameron');