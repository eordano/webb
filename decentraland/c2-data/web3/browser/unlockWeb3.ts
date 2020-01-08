import { checkWeb3 } from './checkWeb3'
import { Web3Results } from './web3Results'
import { getWindow } from './getWindow'

export async function enableWeb3() {
  const window = getWindow()
  if ((await checkWeb3()) === Web3Results.Missing) {
    return Web3Results.Missing
  }
  if (window.ethereum) {
    try {
      await window.ethereum.enable()
      return Web3Results.Unlocked
    } catch (e) {
      return Web3Results.Unauthorized
    }
  }
  if (window.web3) {
    return Web3Results.Unlocked
  }
  return Web3Results.Unauthorized
}
