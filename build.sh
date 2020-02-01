#!/bin/bash
set -e

rm -rf docs
yarn build
mv dist docs
