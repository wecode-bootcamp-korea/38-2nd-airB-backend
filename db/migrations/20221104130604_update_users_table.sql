-- migrate:up
ALTER TABLE users
MODIFY birth DATE NULL,
MODIFY phone_number VARCHAR(50) NULL;

-- migrate:down
DROP TABLE users;
