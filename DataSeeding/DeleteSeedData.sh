#!/bin/bash



#!/bin/bash

echo "Deleting Data in SeniorLearnDb..."

# Use the MONGO_URL environment variable as the base URI
# Ensure MONGO_URL does NOT include the database name
mongosh "${MONGO_URL}/SLearnMobApp_db" --file DataSeeding/DeleteSeedData.js

echo "Data Deleted"
