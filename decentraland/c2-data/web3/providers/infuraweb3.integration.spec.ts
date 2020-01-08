import { rinkeby } from './infuraweb3'
import { Eth } from 'web3x/eth'
import { Address } from 'web3x/address'
import Katalyst from 'dcl/decentraland/c2-data/contracts/Katalyst/Katalyst'

const RINKEBY_KATALYST_CONTRACT = Address.fromString('0xF220706424C98E5485Ce1b2E36527F448B283aD0')

describe('Infura integration test', () => {
    it('fetches a list of servers from a ropsten contract', async () => {
      const eth = new Eth(rinkeby);
      console.log(Katalyst, eth, RINKEBY_KATALYST_CONTRACT)
      // const contract = new Katalyst(eth, RINKEBY_KATALYST_CONTRACT)
      // console.log(await contract.methods.katalystCount().call())
    })
})
