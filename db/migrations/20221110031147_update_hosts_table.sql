-- migrate:up
ALTER TABLE hosts MODIFY point DECIMAL(15,2) NOT NULL DEFAULT 0;

-- migrate:down
DROP TABLE hosts;
