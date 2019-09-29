#!/bin/bash

./node_modules/.bin/mocha ./tests/index.js --exit;
./node_modules/.bin/mocha ./tests/handwriting.js --exit;