import * as ethers from "ethers";
import assert from "assert";

export const abi = new ethers.utils.Interface(getJsonAbi());

export type AdminChanged0Event = ([oldAdmin: string, newAdmin: string] & {oldAdmin: string, newAdmin: string})

export type CancelVote0Event = ([voter: string, period: ethers.BigNumber, poolId: ethers.BigNumber, amount: ethers.BigNumber, poolPeriodScore: ethers.BigNumber, poolPeriodAmount: ethers.BigNumber] & {voter: string, period: ethers.BigNumber, poolId: ethers.BigNumber, amount: ethers.BigNumber, poolPeriodScore: ethers.BigNumber, poolPeriodAmount: ethers.BigNumber})

export type Candidate0Event = ([newAdmin: string] & {newAdmin: string})

export type InheritPool0Event = ([poolId: ethers.BigNumber, curPeriod: ethers.BigNumber, lastPeriod: ethers.BigNumber, amount: ethers.BigNumber, votable: boolean] & {poolId: ethers.BigNumber, curPeriod: ethers.BigNumber, lastPeriod: ethers.BigNumber, amount: ethers.BigNumber, votable: boolean})

export type MigrateVote0Event = ([voter: string, period: ethers.BigNumber, fromPoolIds: Array<ethers.BigNumber>, fromAmounts: Array<ethers.BigNumber>, toPoolIds: Array<ethers.BigNumber>, toAmounts: Array<ethers.BigNumber>] & {voter: string, period: ethers.BigNumber, fromPoolIds: Array<ethers.BigNumber>, fromAmounts: Array<ethers.BigNumber>, toPoolIds: Array<ethers.BigNumber>, toAmounts: Array<ethers.BigNumber>})

export type SetNonVotablePools0Event = ([period: ethers.BigNumber, pools: Array<ethers.BigNumber>] & {period: ethers.BigNumber, pools: Array<ethers.BigNumber>})

export type SetVotablePools0Event = ([period: ethers.BigNumber, pools: Array<ethers.BigNumber>] & {period: ethers.BigNumber, pools: Array<ethers.BigNumber>})

export type UpdatePoolHistory0Event = ([poolId: ethers.BigNumber, curPeriod: ethers.BigNumber, lastPeriod: ethers.BigNumber, needUpdatePool: ethers.BigNumber, lastPeriodAmount: ethers.BigNumber] & {poolId: ethers.BigNumber, curPeriod: ethers.BigNumber, lastPeriod: ethers.BigNumber, needUpdatePool: ethers.BigNumber, lastPeriodAmount: ethers.BigNumber})

export type UpdateStablePools0Event = ([pids: Array<ethers.BigNumber>] & {pids: Array<ethers.BigNumber>})

export type UpdateVoteDuration0Event = ([curPeriod: ethers.BigNumber, voteDuration: ethers.BigNumber] & {curPeriod: ethers.BigNumber, voteDuration: ethers.BigNumber})

export type UpdateVotePeriod0Event = ([curPeriod: ethers.BigNumber, start: ethers.BigNumber, end: ethers.BigNumber] & {curPeriod: ethers.BigNumber, start: ethers.BigNumber, end: ethers.BigNumber})

export type UpdateVoteSetWindow0Event = ([curPeriod: ethers.BigNumber, voteSetWindow: ethers.BigNumber] & {curPeriod: ethers.BigNumber, voteSetWindow: ethers.BigNumber})

export type Vote0Event = ([voter: string, period: ethers.BigNumber, poolId: ethers.BigNumber, amount: ethers.BigNumber, poolPeriodScore: ethers.BigNumber, poolPeriodAmount: ethers.BigNumber] & {voter: string, period: ethers.BigNumber, poolId: ethers.BigNumber, amount: ethers.BigNumber, poolPeriodScore: ethers.BigNumber, poolPeriodAmount: ethers.BigNumber})

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
  "CancelVote(address,uint256,uint256,uint256,uint256,uint256)": {
    topic: abi.getEventTopic("CancelVote(address,uint256,uint256,uint256,uint256,uint256)"),
    decode(data: EvmLog): CancelVote0Event {
      return decodeEvent("CancelVote(address,uint256,uint256,uint256,uint256,uint256)", data)
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
  "InheritPool(uint256,uint256,uint256,uint256,bool)": {
    topic: abi.getEventTopic("InheritPool(uint256,uint256,uint256,uint256,bool)"),
    decode(data: EvmLog): InheritPool0Event {
      return decodeEvent("InheritPool(uint256,uint256,uint256,uint256,bool)", data)
    }
  }
  ,
  "MigrateVote(address,uint256,uint256[],uint256[],uint256[],uint256[])": {
    topic: abi.getEventTopic("MigrateVote(address,uint256,uint256[],uint256[],uint256[],uint256[])"),
    decode(data: EvmLog): MigrateVote0Event {
      return decodeEvent("MigrateVote(address,uint256,uint256[],uint256[],uint256[],uint256[])", data)
    }
  }
  ,
  "SetNonVotablePools(uint256,uint256[])": {
    topic: abi.getEventTopic("SetNonVotablePools(uint256,uint256[])"),
    decode(data: EvmLog): SetNonVotablePools0Event {
      return decodeEvent("SetNonVotablePools(uint256,uint256[])", data)
    }
  }
  ,
  "SetVotablePools(uint256,uint256[])": {
    topic: abi.getEventTopic("SetVotablePools(uint256,uint256[])"),
    decode(data: EvmLog): SetVotablePools0Event {
      return decodeEvent("SetVotablePools(uint256,uint256[])", data)
    }
  }
  ,
  "UpdatePoolHistory(uint256,uint256,uint256,uint256,uint256)": {
    topic: abi.getEventTopic("UpdatePoolHistory(uint256,uint256,uint256,uint256,uint256)"),
    decode(data: EvmLog): UpdatePoolHistory0Event {
      return decodeEvent("UpdatePoolHistory(uint256,uint256,uint256,uint256,uint256)", data)
    }
  }
  ,
  "UpdateStablePools(uint256[])": {
    topic: abi.getEventTopic("UpdateStablePools(uint256[])"),
    decode(data: EvmLog): UpdateStablePools0Event {
      return decodeEvent("UpdateStablePools(uint256[])", data)
    }
  }
  ,
  "UpdateVoteDuration(uint256,uint256)": {
    topic: abi.getEventTopic("UpdateVoteDuration(uint256,uint256)"),
    decode(data: EvmLog): UpdateVoteDuration0Event {
      return decodeEvent("UpdateVoteDuration(uint256,uint256)", data)
    }
  }
  ,
  "UpdateVotePeriod(uint256,uint256,uint256)": {
    topic: abi.getEventTopic("UpdateVotePeriod(uint256,uint256,uint256)"),
    decode(data: EvmLog): UpdateVotePeriod0Event {
      return decodeEvent("UpdateVotePeriod(uint256,uint256,uint256)", data)
    }
  }
  ,
  "UpdateVoteSetWindow(uint256,uint256)": {
    topic: abi.getEventTopic("UpdateVoteSetWindow(uint256,uint256)"),
    decode(data: EvmLog): UpdateVoteSetWindow0Event {
      return decodeEvent("UpdateVoteSetWindow(uint256,uint256)", data)
    }
  }
  ,
  "Vote(address,uint256,uint256,uint256,uint256,uint256)": {
    topic: abi.getEventTopic("Vote(address,uint256,uint256,uint256,uint256,uint256)"),
    decode(data: EvmLog): Vote0Event {
      return decodeEvent("Vote(address,uint256,uint256,uint256,uint256,uint256)", data)
    }
  }
  ,
}

export type BatchCancelVote0Function = ([poolIds: Array<ethers.BigNumber>, amounts: Array<ethers.BigNumber>] & {poolIds: Array<ethers.BigNumber>, amounts: Array<ethers.BigNumber>})

export type BatchVote0Function = ([poolIds: Array<ethers.BigNumber>, amounts: Array<ethers.BigNumber>] & {poolIds: Array<ethers.BigNumber>, amounts: Array<ethers.BigNumber>})

export type CancelVote0Function = ([poolId: ethers.BigNumber, amount: ethers.BigNumber] & {poolId: ethers.BigNumber, amount: ethers.BigNumber})

export type MigrateVote0Function = ([fromPoolIds: Array<ethers.BigNumber>, fromAmounts: Array<ethers.BigNumber>, toPoolIds: Array<ethers.BigNumber>, toAmounts: Array<ethers.BigNumber>] & {fromPoolIds: Array<ethers.BigNumber>, fromAmounts: Array<ethers.BigNumber>, toPoolIds: Array<ethers.BigNumber>, toAmounts: Array<ethers.BigNumber>})

export type SetAdminCandidate0Function = ([_candidate: string] & {_candidate: string})

export type SetNonStablePools0Function = ([poolIds: Array<ethers.BigNumber>] & {poolIds: Array<ethers.BigNumber>})

export type SetNonVotablePools0Function = ([poolIds: Array<ethers.BigNumber>] & {poolIds: Array<ethers.BigNumber>})

export type SetStablePools0Function = ([poolIds: Array<ethers.BigNumber>] & {poolIds: Array<ethers.BigNumber>})

export type SetVotablePools0Function = ([poolIds: Array<ethers.BigNumber>] & {poolIds: Array<ethers.BigNumber>})

export type UpdatePoolHistory0Function = ([poolId: ethers.BigNumber, needUpdatePeriodId: ethers.BigNumber] & {poolId: ethers.BigNumber, needUpdatePeriodId: ethers.BigNumber})

export type UpdateVoteDuration0Function = ([_voteDuration: ethers.BigNumber] & {_voteDuration: ethers.BigNumber})

export type UpdateVoteSetWindow0Function = ([_voteSetWindow: ethers.BigNumber] & {_voteSetWindow: ethers.BigNumber})

export type Vote0Function = ([poolId: ethers.BigNumber, amount: ethers.BigNumber] & {poolId: ethers.BigNumber, amount: ethers.BigNumber})


function decodeFunction(data: string): any {
  return abi.decodeFunctionData(data.slice(0, 10), data)
}

export const functions = {
  "batchCancelVote(uint256[],uint256[])": {
    sighash: abi.getSighash("batchCancelVote(uint256[],uint256[])"),
    decode(input: string): BatchCancelVote0Function {
      return decodeFunction(input)
    }
  }
  ,
  "batchVote(uint256[],uint256[])": {
    sighash: abi.getSighash("batchVote(uint256[],uint256[])"),
    decode(input: string): BatchVote0Function {
      return decodeFunction(input)
    }
  }
  ,
  "cancelVote(uint256,uint256)": {
    sighash: abi.getSighash("cancelVote(uint256,uint256)"),
    decode(input: string): CancelVote0Function {
      return decodeFunction(input)
    }
  }
  ,
  "candidateConfirm()": {
    sighash: abi.getSighash("candidateConfirm()"),
  }
  ,
  "migrateVote(uint256[],uint256[],uint256[],uint256[])": {
    sighash: abi.getSighash("migrateVote(uint256[],uint256[],uint256[],uint256[])"),
    decode(input: string): MigrateVote0Function {
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
  "setNonStablePools(uint256[])": {
    sighash: abi.getSighash("setNonStablePools(uint256[])"),
    decode(input: string): SetNonStablePools0Function {
      return decodeFunction(input)
    }
  }
  ,
  "setNonVotablePools(uint256[])": {
    sighash: abi.getSighash("setNonVotablePools(uint256[])"),
    decode(input: string): SetNonVotablePools0Function {
      return decodeFunction(input)
    }
  }
  ,
  "setStablePools(uint256[])": {
    sighash: abi.getSighash("setStablePools(uint256[])"),
    decode(input: string): SetStablePools0Function {
      return decodeFunction(input)
    }
  }
  ,
  "setVotablePools(uint256[])": {
    sighash: abi.getSighash("setVotablePools(uint256[])"),
    decode(input: string): SetVotablePools0Function {
      return decodeFunction(input)
    }
  }
  ,
  "updatePoolHistory(uint256,uint256)": {
    sighash: abi.getSighash("updatePoolHistory(uint256,uint256)"),
    decode(input: string): UpdatePoolHistory0Function {
      return decodeFunction(input)
    }
  }
  ,
  "updateVoteDuration(uint256)": {
    sighash: abi.getSighash("updateVoteDuration(uint256)"),
    decode(input: string): UpdateVoteDuration0Function {
      return decodeFunction(input)
    }
  }
  ,
  "updateVotePeriod()": {
    sighash: abi.getSighash("updateVotePeriod()"),
  }
  ,
  "updateVoteSetWindow(uint256)": {
    sighash: abi.getSighash("updateVoteSetWindow(uint256)"),
    decode(input: string): UpdateVoteSetWindow0Function {
      return decodeFunction(input)
    }
  }
  ,
  "vote(uint256,uint256)": {
    sighash: abi.getSighash("vote(uint256,uint256)"),
    decode(input: string): Vote0Function {
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

  async allPoolState(arg0: ethers.BigNumber, arg1: ethers.BigNumber): Promise<([inherit: boolean, resetVotable: boolean, votable: boolean, score: ethers.BigNumber, totalAmount: ethers.BigNumber] & {inherit: boolean, resetVotable: boolean, votable: boolean, score: ethers.BigNumber, totalAmount: ethers.BigNumber})> {
    return this.call("allPoolState", [arg0, arg1])
  }

  async farming(): Promise<string> {
    return this.call("farming", [])
  }

  async getCurrentPeriodId(): Promise<ethers.BigNumber> {
    return this.call("getCurrentPeriodId", [])
  }

  async getPoolInfo(poolId: ethers.BigNumber): Promise<([score: ethers.BigNumber, stable: boolean, farmingToken: string, amount: ethers.BigNumber, rewardTokens: Array<string>, rewardPerBlock: Array<ethers.BigNumber>, accRewardPerShare: Array<ethers.BigNumber>, lastRewardBlock: ethers.BigNumber, startBlock: ethers.BigNumber, claimableInterval: ethers.BigNumber] & {score: ethers.BigNumber, stable: boolean, farmingToken: string, amount: ethers.BigNumber, rewardTokens: Array<string>, rewardPerBlock: Array<ethers.BigNumber>, accRewardPerShare: Array<ethers.BigNumber>, lastRewardBlock: ethers.BigNumber, startBlock: ethers.BigNumber, claimableInterval: ethers.BigNumber})> {
    return this.call("getPoolInfo", [poolId])
  }

  async nextVotePeriodID(): Promise<ethers.BigNumber> {
    return this.call("nextVotePeriodID", [])
  }

  async poolLastUpdatePeriod(arg0: ethers.BigNumber): Promise<ethers.BigNumber> {
    return this.call("poolLastUpdatePeriod", [arg0])
  }

  async stablePools(arg0: ethers.BigNumber): Promise<boolean> {
    return this.call("stablePools", [arg0])
  }

  async userInfos(arg0: string, arg1: ethers.BigNumber): Promise<ethers.BigNumber> {
    return this.call("userInfos", [arg0, arg1])
  }

  async voteDuration(): Promise<ethers.BigNumber> {
    return this.call("voteDuration", [])
  }

  async votePeriods(arg0: ethers.BigNumber): Promise<([start: ethers.BigNumber, end: ethers.BigNumber] & {start: ethers.BigNumber, end: ethers.BigNumber})> {
    return this.call("votePeriods", [arg0])
  }

  async voteSetWindow(): Promise<ethers.BigNumber> {
    return this.call("voteSetWindow", [])
  }

  async voteToken(): Promise<string> {
    return this.call("voteToken", [])
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
          "internalType": "address",
          "name": "_farming",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_voteToken",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_voteDuration",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_voteSetWindow",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_firstPeriodStart",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount0",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount1",
          "type": "uint256"
        }
      ],
      "name": "AmountNotEqual",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ArrayMismatch",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "InsuffientAmount",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "block",
          "type": "uint256"
        }
      ],
      "name": "InvalidBlock",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "curPeriod",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "period",
          "type": "uint256"
        }
      ],
      "name": "NoNeedToUpdate",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "poolId",
          "type": "uint256"
        }
      ],
      "name": "PoolNotAllowedToVote",
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
          "name": "voter",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "period",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "poolId",
          "type": "uint256"
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
          "name": "poolPeriodScore",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "poolPeriodAmount",
          "type": "uint256"
        }
      ],
      "name": "CancelVote",
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
          "name": "poolId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "curPeriod",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "lastPeriod",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "votable",
          "type": "bool"
        }
      ],
      "name": "InheritPool",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "voter",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "period",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "fromPoolIds",
          "type": "uint256[]"
        },
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "fromAmounts",
          "type": "uint256[]"
        },
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "toPoolIds",
          "type": "uint256[]"
        },
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "toAmounts",
          "type": "uint256[]"
        }
      ],
      "name": "MigrateVote",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "period",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "pools",
          "type": "uint256[]"
        }
      ],
      "name": "SetNonVotablePools",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "period",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "pools",
          "type": "uint256[]"
        }
      ],
      "name": "SetVotablePools",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "poolId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "curPeriod",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "lastPeriod",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "needUpdatePool",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "lastPeriodAmount",
          "type": "uint256"
        }
      ],
      "name": "UpdatePoolHistory",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "pids",
          "type": "uint256[]"
        }
      ],
      "name": "UpdateStablePools",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "curPeriod",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "voteDuration",
          "type": "uint256"
        }
      ],
      "name": "UpdateVoteDuration",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "curPeriod",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "start",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "end",
          "type": "uint256"
        }
      ],
      "name": "UpdateVotePeriod",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "curPeriod",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "voteSetWindow",
          "type": "uint256"
        }
      ],
      "name": "UpdateVoteSetWindow",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "voter",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "period",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "poolId",
          "type": "uint256"
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
          "name": "poolPeriodScore",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "poolPeriodAmount",
          "type": "uint256"
        }
      ],
      "name": "Vote",
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
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "allPoolState",
      "outputs": [
        {
          "internalType": "bool",
          "name": "inherit",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "resetVotable",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "votable",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "score",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "totalAmount",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256[]",
          "name": "poolIds",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256[]",
          "name": "amounts",
          "type": "uint256[]"
        }
      ],
      "name": "batchCancelVote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256[]",
          "name": "poolIds",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256[]",
          "name": "amounts",
          "type": "uint256[]"
        }
      ],
      "name": "batchVote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "poolId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "cancelVote",
      "outputs": [],
      "stateMutability": "nonpayable",
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
      "name": "farming",
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
      "name": "getCurrentPeriodId",
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
          "internalType": "uint256",
          "name": "poolId",
          "type": "uint256"
        }
      ],
      "name": "getPoolInfo",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "score",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "stable",
          "type": "bool"
        },
        {
          "internalType": "address",
          "name": "farmingToken",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "address[]",
          "name": "rewardTokens",
          "type": "address[]"
        },
        {
          "internalType": "uint256[]",
          "name": "rewardPerBlock",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256[]",
          "name": "accRewardPerShare",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256",
          "name": "lastRewardBlock",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "startBlock",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "claimableInterval",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256[]",
          "name": "fromPoolIds",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256[]",
          "name": "fromAmounts",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256[]",
          "name": "toPoolIds",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256[]",
          "name": "toAmounts",
          "type": "uint256[]"
        }
      ],
      "name": "migrateVote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "nextVotePeriodID",
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
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "poolLastUpdatePeriod",
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
      "inputs": [
        {
          "internalType": "uint256[]",
          "name": "poolIds",
          "type": "uint256[]"
        }
      ],
      "name": "setNonStablePools",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256[]",
          "name": "poolIds",
          "type": "uint256[]"
        }
      ],
      "name": "setNonVotablePools",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256[]",
          "name": "poolIds",
          "type": "uint256[]"
        }
      ],
      "name": "setStablePools",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256[]",
          "name": "poolIds",
          "type": "uint256[]"
        }
      ],
      "name": "setVotablePools",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "stablePools",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "poolId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "needUpdatePeriodId",
          "type": "uint256"
        }
      ],
      "name": "updatePoolHistory",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_voteDuration",
          "type": "uint256"
        }
      ],
      "name": "updateVoteDuration",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "updateVotePeriod",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_voteSetWindow",
          "type": "uint256"
        }
      ],
      "name": "updateVoteSetWindow",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "userInfos",
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
          "internalType": "uint256",
          "name": "poolId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "vote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "voteDuration",
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
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "votePeriods",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "start",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "end",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "voteSetWindow",
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
      "name": "voteToken",
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
