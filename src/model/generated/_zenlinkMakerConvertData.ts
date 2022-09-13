import {ZenlinkMakerConvertPairData} from "./_zenlinkMakerConvertPairData"
import {ZenlinkMakerConvertStableSwapData} from "./_zenlinkMakerConvertStableSwapData"

export type ZenlinkMakerConvertData = ZenlinkMakerConvertPairData | ZenlinkMakerConvertStableSwapData

export function fromJsonZenlinkMakerConvertData(json: any): ZenlinkMakerConvertData {
  switch(json?.isTypeOf) {
    case 'ZenlinkMakerConvertPairData': return new ZenlinkMakerConvertPairData(undefined, json)
    case 'ZenlinkMakerConvertStableSwapData': return new ZenlinkMakerConvertStableSwapData(undefined, json)
    default: throw new TypeError('Unknown json object passed as ZenlinkMakerConvertData')
  }
}
