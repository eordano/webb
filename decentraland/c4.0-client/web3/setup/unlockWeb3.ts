import { checkWeb3Presence, Web3Results } from './checkWeb3'
import { window } from './web3Window'

export async function enableWeb3() {
  if ((await checkWeb3Presence()) === Web3Results.Missing) {
    throw new Error('The browser does not support Web3')
  }
  if (window.ethereum) {
    try {
      await window.ethereum.enable()
      return Web3Results.Unlocked
    } catch (e) {
      return Web3Results.Unauthorized
    }
  } else if (window.web3) {
    return Web3Results.Unlocked
  }
}
