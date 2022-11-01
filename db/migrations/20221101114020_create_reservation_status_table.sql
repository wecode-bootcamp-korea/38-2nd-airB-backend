-- migrate:up
CREATE TABLE reservation_status(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    status VARCHAR(50) NOT NULL
);
-- migrate:down
DROP TABLE reservation_status;