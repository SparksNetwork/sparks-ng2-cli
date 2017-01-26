import {StreamRecord} from "../lib/StreamPublish";

/**
 * Helper to produce data update messages
 *
 * @param domain
 * @param key
 * @param partitionKey
 * @param values
 * @returns {{streamName: string, partitionKey: string, data: {domain: string, action: string, key: string, values: any}}}
 */
export function dataRemove(domain:string, key:string, partitionKey:string):StreamRecord<DataRemove> {
  return {
    streamName: 'data.firebase',
    partitionKey,
    data: {
      domain,
      action: 'remove',
      key
    }
  };
}
