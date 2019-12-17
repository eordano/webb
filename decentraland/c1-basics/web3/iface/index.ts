import { Web3Network } from './Web3Network'
import { Address } from '../../Address';
import { CatalystProviderList } from 'dcl/decentraland/c2-content/CatalystProviderList';

export function withNetwork(targetNetwork: Web3Network) {}

export type ClaimedName = string

export function getNamesForAddress(address: Address): ClaimedName[] {
    return ['John']
}

export function getPassport(name: ClaimedName) {
    return randomizedPassport(name)
}

export function getCatalysts(): CatalystProviderList {
    return []
}

export function selectCatayst(catalystAddress: CatalystProvider) { 
}

export function 