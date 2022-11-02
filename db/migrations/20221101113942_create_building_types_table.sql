-- migrate:up
CREATE TABLE building_types(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);
-- migrate:down
DROP TABLE building_types; 