#! /usr/bin/env bash

set -e

mkdir -p dist

cp extension/manifest.json dist/manifest.json
cp -r extension/static dist/
cp -r devtool/static dist/

bazel build //debugger/extension:inject //debugger/extension:content //debugger/devtool:bundle //debugger/background

mkdir -p dist/js

rm -rf dist/js/*
cp ../bazel-out/darwin-fastbuild/bin/debugger/extension/inject.js dist/js/
cp ../bazel-out/darwin-fastbuild/bin/debugger/extension/content.js dist/js/
cp ../bazel-out/darwin-fastbuild/bin/debugger/devtool/bundle.js dist/js/page.js
cp ../bazel-out/darwin-fastbuild/bin/debugger/background/index.js dist/js/background.js
