import { configureStore } from '@dcl/kernel/core/store'

const path = require('path')
const fs = require('fs')

const store = configureStore()

console.log('it works', store, fs.readdirSync(path.resolve('.')))
