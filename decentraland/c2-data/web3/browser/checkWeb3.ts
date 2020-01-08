import { Web3Results } from './web3Results'
import { getWindow } from './getWindow'

/**
 * This function checks for web3 being present.
 */
export async function checkWeb3() {
  const window = getWindow()
  if (window.ethereum) {
    return Web3Results.Present
  } else if (window.web3) {
    return Web3Results.Present
  }
  return Web3Results.Missing
}
