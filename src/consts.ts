import { Big as BigDecimal } from 'big.js'

export const knownContracts: ReadonlyArray<string> = []

export const CHAIN_NODE = 'wss://wss.api.moonbase.moonbeam.network'

// need to be lowercase
export const FACTORY_ADDRESS = '0x6ED3E6551Bb396091C15a9621aACa6DdB1C01992'.toLowerCase()
export const FOUR_POOL = '0x36aa49803aF6c5b2b2Fe8488D78AbB334de52320'.toLowerCase()

export const ZENLINK_MAKER = '0x59EBBbC1ab1d13a21e5fd84028f04a21e566B63E'.toLowerCase()

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'

export const ZERO_BI = 0n
export const ONE_BI = 1n
export const ZERO_BD = BigDecimal(0)
export const ONE_BD = BigDecimal(1)
export const BI_18 = 1000000000000000000n
