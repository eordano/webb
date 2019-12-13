import { window } from './web3Window'

/**
 * This function checks for web3 being present.
 */
export async function checkWeb3Presence() {
  if (window.ethereum) {
    return Web3Results.Present
  } else if (window.web3) {
    return Web3Results.Unlocked
  }
  return Web3Results.Missing
}

export enum Web3Results {
  Present = 'Present',
  Unlocked = 'Unlocked',
  Missing = 'Missing',
  Unauthorized = 'Unauthorized'
}
