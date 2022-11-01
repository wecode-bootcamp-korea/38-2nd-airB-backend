-- migrate:up
CREATE TABLE hosts(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    guest_id INT NOT NULL,
    registration_number VARCHAR(50) NULL,
    point DECIMAL(9,2) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (guest_id) REFERENCES guests(id)
);
-- migrate:down
DROP TABLE hosts;