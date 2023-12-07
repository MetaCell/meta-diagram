#!/bin/bash
set -e

echo "=== Install / Update script for example application and meta-diagram ==="

npm -g install yalc

cd ../
yarn && yarn run build:dev && yalc push --changed
cd example

yalc add @metacell/meta-diagram
rm -rf node_modules/
yarn
yarn run start
