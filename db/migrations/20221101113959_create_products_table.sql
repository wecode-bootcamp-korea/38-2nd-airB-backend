-- migrate:up
CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  price DECIMAL(8,2) NOT NULL,
  description TEXT NOT NULL,
  latitude DECIMAL(20,15) NULL,
  longitude DECIMAL(20,15) NULL,
  city_id INT NOT NULL,
  host_id INT NOT NULL,
  guest_max INT NOT NULL,
  bedroom_quantity INT NOT NULL,
  bathroom_quantity INT NOT NULL,
  bed_quantity INT NOT NULL,
  building_type_id INT NOT NULL,
  theme_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (city_id) REFERENCES cities(id),
  FOREIGN KEY (host_id) REFERENCES hosts(id),
  FOREIGN KEY (building_type_id) REFERENCES building_types(id),
  FOREIGN KEY (theme_id) REFERENCES themes(id)
);
-- migrate:down
DROP TABLE products;