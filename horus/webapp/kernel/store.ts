import { configureStore } from 'dcl/kernel/core/store'

const { store, start, sagasMiddleware } = configureStore() as any

start()

export { store, sagasMiddleware }
