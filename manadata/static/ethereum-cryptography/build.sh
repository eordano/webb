#! /bin/sh

npx rollup -c rollup.sha256.js sha256.js > sha256.umd.js
npx rollup -c rollup.secp256k1.js secp256k1.js > secp256k1.umd.js
npx rollup -c rollup.random.js random.js > random.umd.js
