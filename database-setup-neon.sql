CREATE TABLE IF NOT EXISTS batches (
    batch_id VARCHAR(255) PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL,
    expiry_date BIGINT NOT NULL,
    storage_rules TEXT,
    current_owner VARCHAR(42) NOT NULL,
    is_flagged BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tx_hash VARCHAR(66)
);

CREATE TABLE IF NOT EXISTS shipments (
    id SERIAL PRIMARY KEY,
    batch_id VARCHAR(255),
    location VARCHAR(255) NOT NULL,
    temperature INTEGER NOT NULL,
    is_breach BOOLEAN DEFAULT FALSE,
    timestamp BIGINT NOT NULL,
    tx_hash VARCHAR(66),
    from_type VARCHAR(50),
    from_name VARCHAR(255),
    from_address TEXT,
    from_contact VARCHAR(100),
    to_type VARCHAR(50),
    to_name VARCHAR(255),
    to_address TEXT,
    to_contact VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE shipments 
ADD CONSTRAINT fk_batch 
FOREIGN KEY (batch_id) 
REFERENCES batches(batch_id) 
ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_batch_id ON shipments(batch_id);
CREATE INDEX IF NOT EXISTS idx_batches_created_at ON batches(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_batches_flagged ON batches(is_flagged);
CREATE INDEX IF NOT EXISTS idx_shipments_created_at ON shipments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_shipments_breach ON shipments(is_breach);
