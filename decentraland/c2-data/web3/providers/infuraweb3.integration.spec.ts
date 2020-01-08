import { rinkeby } from './infuraweb3'
import { Eth } from 'web3x-es/eth'
import { Address } from 'web3x-es/address'

const RINKEBY_KATALYST_CONTRACT = Address.fromString('0xF220706424C98E5485Ce1b2E36527F448B283aD0')

describe('Infura integration test', () => {
    it('fetches a list of servers from a ropsten contract', async () => {
      const eth = new Eth(rinkeby);
      const result = await eth
    })
})
