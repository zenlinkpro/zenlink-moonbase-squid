import { Big as BigDecimal } from 'big.js'

export const knownContracts: ReadonlyArray<string> = []

export const CHAIN_NODE = 'wss://wss.api.moonbase.moonbeam.network'

// need to be lowercase
export const FACTORY_ADDRESS = '0x6ED3E6551Bb396091C15a9621aACa6DdB1C01992'.toLowerCase()
export const FOUR_POOL = '0x36aa49803aF6c5b2b2Fe8488D78AbB334de52320'.toLowerCase()

// contracts
export const ZENLINK_MAKER = '0x59EBBbC1ab1d13a21e5fd84028f04a21e566B63E'.toLowerCase()
export const VXZLK = '0xb38188fEDff30bEc23aEf5C691AB647756771fF1'.toLowerCase()
export const DISPATCHER = '0xaa3B362b0aE5c99C2E2DA11CC8F3A3fAbd5f6c2D'.toLowerCase()
export const GAUGE = '0xA12e750486A6edfA30AEaF168AED6689E2c09913'.toLowerCase()

export const WNATIVE = '0x674421E9567653EE76e96fEEA3B2B2966d000Dbd'.toLowerCase()
export const USDC = '0x1E80A824Ed280c5Ee783D76fdcB634a67C95Edb7'.toLowerCase()
export const ZLK = '0xB5989e3Eb10bBe04b962586910C0bBC1238baD78'.toLowerCase()
export const WNATIVE_USDC = '0xA82e5eF8Ca4670a59129aB09Af5c895D5712Fa3b'.toLowerCase()

export const WHITELIST: string[] = [
  WNATIVE, // wnative
  USDC,    // usdc
  ZLK,     // zlk
]

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'

export const ZERO_BI = 0n
export const ONE_BI = 1n
export const ZERO_BD = BigDecimal(0)
export const ONE_BD = BigDecimal(1)
export const BI_18 = 1000000000000000000n
