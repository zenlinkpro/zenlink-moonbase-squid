import * as ethers from "ethers";
import assert from "assert";

export const abi = new ethers.utils.Interface(getJsonAbi());

export type AdminChanged0Event = ([oldAdmin: string, newAdmin: string] & {oldAdmin: string, newAdmin: string})

export type Candidate0Event = ([newAdmin: string] & {newAdmin: string})

export type Charged0Event = ([sender: string, token: string, amount: ethers.BigNumber] & {sender: string, token: string, amount: ethers.BigNumber})

export type DispatchReward0Event = ([dest: string, token: string, amount: ethers.BigNumber] & {dest: string, token: string, amount: ethers.BigNumber})

export type UpdateRate0Event = ([rate: ethers.BigNumber] & {rate: ethers.BigNumber})

export type WithdrawReward0Event = ([sender: string, token: string, amount: ethers.BigNumber] & {sender: string, token: string, amount: ethers.BigNumber})

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
  "Charged(address,address,uint256)": {
    topic: abi.getEventTopic("Charged(address,address,uint256)"),
    decode(data: EvmLog): Charged0Event {
      return decodeEvent("Charged(address,address,uint256)", data)
    }
  }
  ,
  "DispatchReward(address,address,uint256)": {
    topic: abi.getEventTopic("DispatchReward(address,address,uint256)"),
    decode(data: EvmLog): DispatchReward0Event {
      return decodeEvent("DispatchReward(address,address,uint256)", data)
    }
  }
  ,
  "UpdateRate(uint256)": {
    topic: abi.getEventTopic("UpdateRate(uint256)"),
    decode(data: EvmLog): UpdateRate0Event {
      return decodeEvent("UpdateRate(uint256)", data)
    }
  }
  ,
  "WithdrawReward(address,address,uint256)": {
    topic: abi.getEventTopic("WithdrawReward(address,address,uint256)"),
    decode(data: EvmLog): WithdrawReward0Event {
      return decodeEvent("WithdrawReward(address,address,uint256)", data)
    }
  }
  ,
}

export type SetAdminCandidate0Function = ([_candidate: string] & {_candidate: string})

export type UpdateRate0Function = ([rate: ethers.BigNumber] & {rate: ethers.BigNumber})

export type WithdrawRewards0Function = ([amount: ethers.BigNumber] & {amount: ethers.BigNumber})


function decodeFunction(data: string): any {
  return abi.decodeFunctionData(data.slice(0, 10), data)
}

export const functions = {
  "candidateConfirm()": {
    sighash: abi.getSighash("candidateConfirm()"),
  }
  ,
  "dispatchReward()": {
    sighash: abi.getSighash("dispatchReward()"),
  }
  ,
  "setAdminCandidate(address)": {
    sighash: abi.getSighash("setAdminCandidate(address)"),
    decode(input: string): SetAdminCandidate0Function {
      return decodeFunction(input)
    }
  }
  ,
  "updateRate(uint256)": {
    sighash: abi.getSighash("updateRate(uint256)"),
    decode(input: string): UpdateRate0Function {
      return decodeFunction(input)
    }
  }
  ,
  "withdrawRewards(uint256)": {
    sighash: abi.getSighash("withdrawRewards(uint256)"),
    decode(input: string): WithdrawRewards0Function {
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

  async admin(): Promise<string> {
    return this.call("admin", [])
  }

  async adminCandidate(): Promise<string> {
    return this.call("adminCandidate", [])
  }

  async dest(): Promise<string> {
    return this.call("dest", [])
  }

  async lastRecordBlock(): Promise<ethers.BigNumber> {
    return this.call("lastRecordBlock", [])
  }

  async rewardRate(): Promise<ethers.BigNumber> {
    return this.call("rewardRate", [])
  }

  async token(): Promise<string> {
    return this.call("token", [])
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
          "internalType": "contract IERC20",
          "name": "_token",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_dest",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
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
          "indexed": true,
          "internalType": "address",
          "name": "sender",
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
        }
      ],
      "name": "Charged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "dest",
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
        }
      ],
      "name": "DispatchReward",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "rate",
          "type": "uint256"
        }
      ],
      "name": "UpdateRate",
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
          "name": "token",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "WithdrawReward",
      "type": "event"
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
      "inputs": [],
      "name": "candidateConfirm",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "dest",
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
      "name": "dispatchReward",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "lastRecordBlock",
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
      "name": "rewardRate",
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
      "inputs": [],
      "name": "token",
      "outputs": [
        {
          "internalType": "contract IERC20",
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
          "internalType": "uint256",
          "name": "rate",
          "type": "uint256"
        }
      ],
      "name": "updateRate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "withdrawRewards",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
}
