import { getServerConfigurations } from '@dcl/config'

export async function fetchInventoryItemsByAddress(address: string) {
  const result = await fetch(getServerConfigurations().wearablesApi + '/address/' + address)
  if (!result.ok) {
    throw new Error('Unable to fetch inventory for address ' + address)
  }
  return (await result.json()).inventory
}
