CREATE DATABASE tcgdex;

CREATE TABLE users (
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    collection_id SERIAL NOT NULL PRIMARY KEY
);

CREATE TABLE card (
    card_id VARCHAR(255) NOT NULL PRIMARY KEY,
    pokemon VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    hp VARCHAR(255) NOT NULL
);

CREATE TABLE collection (
    collection_id int NOT NULL,
    FOREIGN KEY (collection_id) REFERENCES users(collection_id) ON DELETE CASCADE ON UPDATE CASCADE ,
    card_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (card_id) REFERENCES card(card_id) ON DELETE CASCADE ON UPDATE CASCADE 
);

