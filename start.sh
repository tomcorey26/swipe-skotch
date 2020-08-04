#!/bin/bash


concurrently  "cd ./packages/server && npm run up" "cd ./packages/client && npm start" "cd ./packages/common && npm run build:watch"
