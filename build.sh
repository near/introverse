#!/bin/bash
set -e

rm -rf docs
yarn build
mv build docs
