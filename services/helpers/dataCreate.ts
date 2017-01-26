import {StreamRecord} from "../lib/StreamPublish";

export function dataCreate(domain:string, key:string, partitionKey:string, values:any):StreamRecord<DataCreate> {
  return {
    streamName: 'data.firebase',
    partitionKey,
    data: {
      domain,
      action: 'create',
      key,
      values
    }
  };
}
