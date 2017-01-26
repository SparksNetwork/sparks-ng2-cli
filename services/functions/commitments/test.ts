import {test} from 'ava';
import service from './index';
import {StreamTransform} from "../../test/StreamTransform";

const createCommand = {
  domain: 'Commitments',
  action: 'create',
  uid: 'abc123',
  payload: {
    values: {
      oppKey: 'opp123',
      code: 'deposit',
      amount: '122'
    }
  }
};

const updateCommand:CommandCommitmentsUpdate = {
  domain: 'Commitments',
  action: 'update',
  uid: 'abc123',
  payload: {
    key: 'com123',
    values: {
      amount: 124
    }
  }
};

const removeCommand:CommandCommitmentsRemove = {
  domain: 'Commitments',
  action: 'remove',
  uid: 'abc123',
  payload: {
    key: 'com123'
  }
};

test.serial('create', async function(t) {
  const [{streamName, data}] = await StreamTransform(createCommand, service);
  t.is(streamName, 'data.firebase');
  t.is(data.domain, 'Commitments');
  t.is(data.action, 'create');
  t.truthy(data.key);
  t.deepEqual(data.values, {
    oppKey: 'opp123',
    code: 'deposit',
    amount: 122
  });
});

test.serial('update', async function(t) {
  const [{streamName, data}] = await StreamTransform(updateCommand, service);
  t.is(streamName, 'data.firebase');
  t.is(data.domain, 'Commitments');
  t.is(data.action, 'update');
  t.is(data.key, 'com123');
  t.deepEqual(data.values, {
    amount: 124
  });
});

test.serial('remove', async function(t) {
  const [{streamName, data}] = await StreamTransform(removeCommand, service);
  t.is(streamName, 'data.firebase');
  t.is(data.domain, 'Commitments');
  t.is(data.action, 'remove');
  t.is(data.key, 'com123');
});
