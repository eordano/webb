export type Web3Window = {
  ethereum?: {
    enable: () => Promise<void>
  }
  web3?: object
}

export function getWindow() {
  return new Function('getWindow', 'return window')() as Web3Window
}
