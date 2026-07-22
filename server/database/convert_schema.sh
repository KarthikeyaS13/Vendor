#!/bin/bash

# Convert SQLite schema to PostgreSQL schema format
# Change AUTOINCREMENT to SERIAL
# Change DATETIME to TIMESTAMP
# Change BOOLEAN DEFAULT 1 to BOOLEAN DEFAULT TRUE

cd /home/surendra/Karthikeya/vendor-management/server/database

# Make a backup
cp schema.sql schema.sql.bak

# Perform replacements using sed
sed -i 's/AUTOINCREMENT/SERIAL/g' schema.sql
sed -i 's/DATETIME/TIMESTAMP/g' schema.sql
sed -i 's/BOOLEAN DEFAULT 1/BOOLEAN DEFAULT TRUE/g' schema.sql
sed -i 's/BOOLEAN DEFAULT 0/BOOLEAN DEFAULT FALSE/g' schema.sql
sed -i 's/INTEGER PRIMARY KEY/SERIAL PRIMARY KEY/g' schema.sql
sed -i 's/INTEGER PRIMARY KEY SERIAL/SERIAL PRIMARY KEY/g' schema.sql

# Now we need to remove duplicate SERIAL PRIMARY KEY SERIAL if any
sed -i 's/SERIAL PRIMARY KEY SERIAL/SERIAL PRIMARY KEY/g' schema.sql

echo "Schema updated for PostgreSQL."
