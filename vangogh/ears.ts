import { configureStore } from '@dcl/kernel/core/store'

async function main() {
  const store = configureStore()
  store.subscribe((e: any) => {
      console.log(e)
  })
}

if (!module.parent) {
  main().catch(console.log)
}
