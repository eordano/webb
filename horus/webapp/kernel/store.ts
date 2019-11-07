import { configureStore } from 'dcl/kernel/core/store'

const { store, start } = configureStore() as any

start()

export { store }
