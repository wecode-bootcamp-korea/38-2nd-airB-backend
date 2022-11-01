-- migrate:up
CREATE TABLE holiday_status(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- migrate:down
DROP TABLE holiday_status;
