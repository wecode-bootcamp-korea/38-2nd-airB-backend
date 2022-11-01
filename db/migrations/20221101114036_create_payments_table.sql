-- migrate:up
CREATE TABLE payments(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    reservation_id INT NOT NULL,
    payment_status_id INT NOT NULL,
    FOREIGN KEY (reservation_id) REFERENCES reservations(id),
    FOREIGN KEY (payment_status_id) REFERENCES payment_status(id)
);
-- migrate:down
DROP TABLE payments;