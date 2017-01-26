import service from './index';
import {test} from 'ava';
import {StreamTransform} from "../../test/StreamTransform";

test.serial('engagements create', async function(t) {
  const command:CommandEngagementsCreate = {
    domain: 'Engagements',
    action: 'create',
    uid: 'abc123',
    payload: {
      values: {
        oppKey: 'opp123',
        profileKey: 'pro123'
      }
    }
  };

  const messages = await StreamTransform(command, service);
  t.is(messages.length, 1);

  const [message] = messages;
  t.is(message.streamName, 'data.firebase');
  t.is(message.partitionKey, 'abc123');

  const {data} = message;
  t.is(data.domain, 'Engagements');
  t.is(data.action, 'update');
  t.is(data.key, 'opp123-pro123');
  t.deepEqual(data.values, {
    oppKey: 'opp123',
    profileKey: 'pro123',
    isApplied: false,
    isAccepted: false,
    isConfirmed: false,
  });
});

test.serial('engagements update', async function(t) {
  const command:CommandEngagementsUpdate = {
    domain: 'Engagements',
    action: 'update',
    uid: 'abc123',
    payload: {
      key: 'eng123',
      values: {
        isApplied: true
      }
    }
  };

  const [{data}] = await StreamTransform(command, service);
  t.is(data.domain, 'Engagements');
  t.is(data.action, 'update');
  t.is(data.key, 'eng123');
  t.deepEqual(data.values, {
    isApplied: true
  });
});
