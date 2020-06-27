#!/bin/bash

concurrently "cd ./packages/server && npm start" "cd ./packages/client && npm start" "cd ./packages/common && npm run build:watch"
