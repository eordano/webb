import { IBrokerConnection } from './IBrokerConnection'

export async function awaitMessage(connection: IBrokerConnection) {
  return new Promise(resolve => {
    connection.onUpdateObservable.addOnce(resolve)
  })
}
