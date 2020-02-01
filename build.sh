#!/bin/bash
set -e

rm -rf docs
yarn build
mv dist docs
cp src/CNAME docs/
cp src/.nojekyll docs/