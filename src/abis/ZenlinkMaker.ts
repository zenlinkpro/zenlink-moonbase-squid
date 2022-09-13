import * as ethers from "ethers";
import assert from "assert";

export const abi = new ethers.utils.Interface(getJsonAbi());

export type AdminChanged0Event = ([oldAdmin: string, newAdmin: string] & {oldAdmin: string, newAdmin: string})

export type Candidate0Event = ([newAdmin: string] & {newAdmin: string})

export type FeeChanged0Event = ([newFee: ethers.BigNumber] & {newFee: ethers.BigNumber})

export type FeeDistributorChanged0Event = ([newController: string] & {newController: string})

export type LogBridgeSet0Event = ([token: string, bridge: string] & {token: string, bridge: string})

export type LogConvertPair0Event = ([sender: string, token0: string, token1: string, amount0: ethers.BigNumber, amount1: ethers.BigNumber, amountZLK: ethers.BigNumber] & {sender: string, token0: string, token1: string, amount0: ethers.BigNumber, amount1: ethers.BigNumber, amountZLK: ethers.BigNumber})

export type LogConvertStableSwap0Event = ([sender: string, pool: string, token: string, amount: ethers.BigNumber, amountZLK: ethers.BigNumber] & {sender: string, pool: string, token: string, amount: ethers.BigNumber, amountZLK: ethers.BigNumber})

export type LogStableSwapFeeTokenIndexSet0Event = ([pool: string, feeTokenIndex: number] & {pool: string, feeTokenIndex: number})

export interface EvmLog {
  data: string;
  topics: string[];
}

function decodeEvent(signature: string, data: EvmLog): any {
  return abi.decodeEventLog(
    abi.getEvent(signature),
    data.data || "",
    data.topics
  );
}

export const events = {
  "AdminChanged(address,address)": {
    topic: abi.getEventTopic("AdminChanged(address,address)"),
    decode(data: EvmLog): AdminChanged0Event {
      return decodeEvent("AdminChanged(address,address)", data)
    }
  }
  ,
  "Candidate(address)": {
    topic: abi.getEventTopic("Candidate(address)"),
    decode(data: EvmLog): Candidate0Event {
      return decodeEvent("Candidate(address)", data)
    }
  }
  ,
  "FeeChanged(uint256)": {
    topic: abi.getEventTopic("FeeChanged(uint256)"),
    decode(data: EvmLog): FeeChanged0Event {
      return decodeEvent("FeeChanged(uint256)", data)
    }
  }
  ,
  "FeeDistributorChanged(address)": {
    topic: abi.getEventTopic("FeeDistributorChanged(address)"),
    decode(data: EvmLog): FeeDistributorChanged0Event {
      return decodeEvent("FeeDistributorChanged(address)", data)
    }
  }
  ,
  "LogBridgeSet(address,address)": {
    topic: abi.getEventTopic("LogBridgeSet(address,address)"),
    decode(data: EvmLog): LogBridgeSet0Event {
      return decodeEvent("LogBridgeSet(address,address)", data)
    }
  }
  ,
  "LogConvertPair(address,address,address,uint256,uint256,uint256)": {
    topic: abi.getEventTopic("LogConvertPair(address,address,address,uint256,uint256,uint256)"),
    decode(data: EvmLog): LogConvertPair0Event {
      return decodeEvent("LogConvertPair(address,address,address,uint256,uint256,uint256)", data)
    }
  }
  ,
  "LogConvertStableSwap(address,address,address,uint256,uint256)": {
    topic: abi.getEventTopic("LogConvertStableSwap(address,address,address,uint256,uint256)"),
    decode(data: EvmLog): LogConvertStableSwap0Event {
      return decodeEvent("LogConvertStableSwap(address,address,address,uint256,uint256)", data)
    }
  }
  ,
  "LogStableSwapFeeTokenIndexSet(address,uint8)": {
    topic: abi.getEventTopic("LogStableSwapFeeTokenIndexSet(address,uint8)"),
    decode(data: EvmLog): LogStableSwapFeeTokenIndexSet0Event {
      return decodeEvent("LogStableSwapFeeTokenIndexSet(address,uint8)", data)
    }
  }
  ,
}

export type ConvertPair0Function = ([token0: string, token1: string] & {token0: string, token1: string})

export type ConvertPairMultiple0Function = ([tokens0: Array<string>, tokens1: Array<string>] & {tokens0: Array<string>, tokens1: Array<string>})

export type ConvertStableSwap0Function = ([pool: string] & {pool: string})

export type ConvertStableSwapMultiple0Function = ([pools: Array<string>] & {pools: Array<string>})

export type SetAdminCandidate0Function = ([_candidate: string] & {_candidate: string})

export type SetBridge0Function = ([token: string, bridge: string] & {token: string, bridge: string})

export type SetFee0Function = ([newFee: ethers.BigNumber] & {newFee: ethers.BigNumber})

export type SetFeeDistributor0Function = ([_feeDistributor: string] & {_feeDistributor: string})

export type SetFeeTokenIndex0Function = ([pool: string, feeTokenIndex: number] & {pool: string, feeTokenIndex: number})


function decodeFunction(data: string): any {
  return abi.decodeFunctionData(data.slice(0, 10), data)
}

export const functions = {
  "candidateConfirm()": {
    sighash: abi.getSighash("candidateConfirm()"),
  }
  ,
  "convertPair(address,address)": {
    sighash: abi.getSighash("convertPair(address,address)"),
    decode(input: string): ConvertPair0Function {
      return decodeFunction(input)
    }
  }
  ,
  "convertPairMultiple(address[],address[])": {
    sighash: abi.getSighash("convertPairMultiple(address[],address[])"),
    decode(input: string): ConvertPairMultiple0Function {
      return decodeFunction(input)
    }
  }
  ,
  "convertStableSwap(address)": {
    sighash: abi.getSighash("convertStableSwap(address)"),
    decode(input: string): ConvertStableSwap0Function {
      return decodeFunction(input)
    }
  }
  ,
  "convertStableSwapMultiple(address[])": {
    sighash: abi.getSighash("convertStableSwapMultiple(address[])"),
    decode(input: string): ConvertStableSwapMultiple0Function {
      return decodeFunction(input)
    }
  }
  ,
  "setAdminCandidate(address)": {
    sighash: abi.getSighash("setAdminCandidate(address)"),
    decode(input: string): SetAdminCandidate0Function {
      return decodeFunction(input)
    }
  }
  ,
  "setBridge(address,address)": {
    sighash: abi.getSighash("setBridge(address,address)"),
    decode(input: string): SetBridge0Function {
      return decodeFunction(input)
    }
  }
  ,
  "setFee(uint256)": {
    sighash: abi.getSighash("setFee(uint256)"),
    decode(input: string): SetFee0Function {
      return decodeFunction(input)
    }
  }
  ,
  "setFeeDistributor(address)": {
    sighash: abi.getSighash("setFeeDistributor(address)"),
    decode(input: string): SetFeeDistributor0Function {
      return decodeFunction(input)
    }
  }
  ,
  "setFeeTokenIndex(address,uint8)": {
    sighash: abi.getSighash("setFeeTokenIndex(address,uint8)"),
    decode(input: string): SetFeeTokenIndex0Function {
      return decodeFunction(input)
    }
  }
  ,
}

interface ChainContext  {
  _chain: Chain
}

interface BlockContext  {
  _chain: Chain
  block: Block
}

interface Block  {
  height: number
}

interface Chain  {
  client:  {
    call: <T=any>(method: string, params?: unknown[]) => Promise<T>
  }
}

export class Contract  {
  private readonly _chain: Chain
  private readonly blockHeight: number
  readonly address: string

  constructor(ctx: BlockContext, address: string)
  constructor(ctx: ChainContext, block: Block, address: string)
  constructor(ctx: BlockContext, blockOrAddress: Block | string, address?: string) {
    this._chain = ctx._chain
    if (typeof blockOrAddress === 'string')  {
      this.blockHeight = ctx.block.height
      this.address = ethers.utils.getAddress(blockOrAddress)
    }
    else  {
      assert(address != null)
      this.blockHeight = blockOrAddress.height
      this.address = ethers.utils.getAddress(address)
    }
  }

  async PRECISION(): Promise<ethers.BigNumber> {
    return this.call("PRECISION", [])
  }

  async admin(): Promise<string> {
    return this.call("admin", [])
  }

  async adminCandidate(): Promise<string> {
    return this.call("adminCandidate", [])
  }

  async bridgeFor(token: string): Promise<string> {
    return this.call("bridgeFor", [token])
  }

  async factory(): Promise<string> {
    return this.call("factory", [])
  }

  async fee(): Promise<ethers.BigNumber> {
    return this.call("fee", [])
  }

  async feeDistributor(): Promise<string> {
    return this.call("feeDistributor", [])
  }

  async feeTokenIndexFor(pool: string): Promise<number> {
    return this.call("feeTokenIndexFor", [pool])
  }

  async vxzlk(): Promise<string> {
    return this.call("vxzlk", [])
  }

  private async call(name: string, args: any[]) : Promise<any> {
    const fragment = abi.getFunction(name)
    const data = abi.encodeFunctionData(fragment, args)
    const result = await this._chain.client.call('eth_call', [{to: this.address, data}, this.blockHeight])
    const decoded = abi.decodeFunctionResult(fragment, result)
    return decoded.length > 1 ? decoded : decoded[0]
  }
}

function getJsonAbi(): any {
  return [
    {
      "inputs": [
        {
          "internalType": "contract IFactory",
          "name": "_factory",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_vxzlk",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_zlk",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_wnative",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_feeDistributor",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "ArrayMismatch",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        }
      ],
      "name": "BridgeTokenInvalid",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "newFee",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "max",
          "type": "uint256"
        }
      ],
      "name": "FeeExceedsMaximum",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "NotEOA",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "feeTokenIndex",
          "type": "uint8"
        }
      ],
      "name": "TokenIndexInvalid",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ZeroAddress",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "oldAdmin",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newAdmin",
          "type": "address"
        }
      ],
      "name": "AdminChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "newAdmin",
          "type": "address"
        }
      ],
      "name": "Candidate",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "newFee",
          "type": "uint256"
        }
      ],
      "name": "FeeChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "newController",
          "type": "address"
        }
      ],
      "name": "FeeDistributorChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "bridge",
          "type": "address"
        }
      ],
      "name": "LogBridgeSet",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "token0",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "token1",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount0",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount1",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amountZLK",
          "type": "uint256"
        }
      ],
      "name": "LogConvertPair",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "pool",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amountZLK",
          "type": "uint256"
        }
      ],
      "name": "LogConvertStableSwap",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "pool",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint8",
          "name": "feeTokenIndex",
          "type": "uint8"
        }
      ],
      "name": "LogStableSwapFeeTokenIndexSet",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "PRECISION",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "admin",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "adminCandidate",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        }
      ],
      "name": "bridgeFor",
      "outputs": [
        {
          "internalType": "address",
          "name": "bridge",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "candidateConfirm",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "token0",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "token1",
          "type": "address"
        }
      ],
      "name": "convertPair",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "tokens0",
          "type": "address[]"
        },
        {
          "internalType": "address[]",
          "name": "tokens1",
          "type": "address[]"
        }
      ],
      "name": "convertPairMultiple",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract IStableSwap",
          "name": "pool",
          "type": "address"
        }
      ],
      "name": "convertStableSwap",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract IStableSwap[]",
          "name": "pools",
          "type": "address[]"
        }
      ],
      "name": "convertStableSwapMultiple",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "factory",
      "outputs": [
        {
          "internalType": "contract IFactory",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "fee",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "feeDistributor",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "pool",
          "type": "address"
        }
      ],
      "name": "feeTokenIndexFor",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "feeTokenIndex",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_candidate",
          "type": "address"
        }
      ],
      "name": "setAdminCandidate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "bridge",
          "type": "address"
        }
      ],
      "name": "setBridge",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "newFee",
          "type": "uint256"
        }
      ],
      "name": "setFee",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_feeDistributor",
          "type": "address"
        }
      ],
      "name": "setFeeDistributor",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "pool",
          "type": "address"
        },
        {
          "internalType": "uint8",
          "name": "feeTokenIndex",
          "type": "uint8"
        }
      ],
      "name": "setFeeTokenIndex",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "vxzlk",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
}
