-- migrate:up
CREATE TABLE holidays(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    holiday_status_id INT NOT NULL,
    product_id INT NOT NULL,
    FOREIGN KEY (holiday_status_id) REFERENCES holiday_status(id),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- migrate:down
DROP TABLE holidays;
