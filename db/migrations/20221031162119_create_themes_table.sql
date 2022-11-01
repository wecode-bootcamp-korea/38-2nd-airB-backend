-- migrate:up
CREATE TABLE themes(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- migrate:down
DROP TABLE themes;
