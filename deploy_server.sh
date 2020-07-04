#!/bin/bash
yarn build:server
docker build -t tomcorey26/swipe-skotch:latest .
docker push tomcorey26/swipe-skotch:latest
ssh root@167.172.246.232 "docker pull tomcorey26/swipe-skotch:latest && docker tag tomcorey26/swipe-skotch:latest dokku/swipe-skotch:latest && dokku tags:deploy swipe-skotch latest"