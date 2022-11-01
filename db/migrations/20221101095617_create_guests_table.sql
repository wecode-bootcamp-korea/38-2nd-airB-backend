-- migrate:up
CREATE TABLE guests(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    profile_image VARCHAR(3000) NOT NULL DEFAULT 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png',
    kakao_id BIGINT NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    birth DATE NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    point DECIMAL(9,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- migrate:down
DROP TABLE guests;