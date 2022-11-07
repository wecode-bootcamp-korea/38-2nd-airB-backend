-- migrate:up
ALTER TABLE hosts MODIFY point DECIMAL(9,2) NOT NULL DEFAULT 0;

-- migrate:down
DROP TABLE hosts;
