import { window } from './web3Window'
import { Web3Results } from './Web3Results'

/**
 * This function checks for web3 being present.
 */
export async function checkWeb3Presence() {
  if (window.ethereum) {
    return Web3Results.Present
  } else if (window.web3) {
    return Web3Results.Present
  }
  return Web3Results.Missing
}
