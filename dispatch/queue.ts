import * as FirebaseQueue from 'firebase-queue';
import {QueueMessage} from './types';

interface FirebaseQueueMessage {
  _id:string;
  _owner:string;
  _progress:number;
  _state:string;
  _state_changed:number;
  action:string;
  domain:string;
  payload:any;
  uid:string;
}

type QueueCallback = (message:QueueMessage) => Promise<any>

function firebaseMessageToQueueMessage(data:FirebaseQueueMessage):QueueMessage {
  return {
    domain: data.domain,
    action: data.action,
    key: data._id,
    payload: data.payload,
    uid: data.uid
  };
}

function makeQueueHandler(callback:QueueCallback):FirebaseQueueCallback {

  return function queueHandler(data:FirebaseQueueMessage, progress, resolve, reject) {
    ((_)=>(_))(progress); // Stupid not used message

    const message = firebaseMessageToQueueMessage(data);

    return callback(message)
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(err);
      });
  };
}

/**
 * Start a firebase queue process listening to the queue and making a callback
 * with each message. The callback must return a promise that when resolves
 * removes the queue entry and if rejects puts the queue entry into an error
 * state.
 *
 * @param ref
 * @param callback
 * @returns {FirebaseQueue}
 */
export function Queue(ref:firebase.database.Reference, callback:(message:QueueMessage) => Promise<any>) {
  return new FirebaseQueue(ref, {sanitize: false}, makeQueueHandler(callback));
}
