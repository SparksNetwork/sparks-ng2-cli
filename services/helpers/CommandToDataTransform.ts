import {StreamTransform} from "../lib/StreamTransform";
import {spread} from "../lib/spread";
import {firebaseUid} from "../lib/ExternalFactories/Firebase";
import {identity} from 'ramda';

export type TransformFunction = (messages:any[]) => any[] | Promise<any[]>

export function CreateTransform(schemaName:string, transform?:TransformFunction) {
  return StreamTransform(schemaName, async function(message:Command) {
    const {domain, action, uid, payload} = message;
    const {values} = payload as any;
    const key = firebaseUid();

    return await (transform||identity)([{
      streamName: 'data.firebase',
      partitionKey: uid,
      data: {
        domain,
        action,
        key,
        values
      }
    }]);
  });
}

export function UpdateTransform(schemaName:string, transform?:TransformFunction) {
  return StreamTransform(schemaName, async function(message:Command) {
    const {domain, action, uid, payload} = message;
    const {key, values} = payload as any;

    return await (transform||identity)([{
      streamName: 'data.firebase',
      partitionKey: uid,
      data: {
        domain,
        action,
        key,
        values
      }
    }])
  });
}

export function RemoveTransform(schemaName:string, transform?:TransformFunction) {
  return StreamTransform(schemaName, async function(message:Command) {
    const {domain, action, uid, payload} = message;
    const {key} = payload as any;

    return (transform||identity)([{
      streamName: 'data.firebase',
      partitionKey: uid,
      data: {
        domain,
        action,
        key
      }
    }]);
  });
}

export function CommandTransform(domain:string) {
  return spread(
    CreateTransform('command.' + domain + '.create'),
    UpdateTransform('command.' + domain + '.update'),
    RemoveTransform('command.' + domain + '.remove')
  );
}
