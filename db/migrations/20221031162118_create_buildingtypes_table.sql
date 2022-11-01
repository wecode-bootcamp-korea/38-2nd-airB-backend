-- migrate:up
CREATE TABLE buildingtypes(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- migrate:down
DROP TABLE buildingtypes;
