-- migrate:up
CREATE TABLE reviews(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    content VARCHAR(1000) NOT NULL,
    guest_id INT NOT NULL,
    product_id INT NOT NULL,
    stars INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (guest_id) REFERENCES guests(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- migrate:down
DROP TABLE reviews;
