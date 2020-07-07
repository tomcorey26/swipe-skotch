#!/bin/bash

# "cd ./packages/server && npm start"
concurrently  "cd ./packages/client && npm start" "cd ./packages/common && npm run build:watch"
