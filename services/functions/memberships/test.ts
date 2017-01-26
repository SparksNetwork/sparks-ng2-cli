import {test} from 'ava';
import service from './index';
import {StreamTransform} from "../../test/StreamTransform";

const createCommand = {
  domain: 'Memberships',
  action: 'create',
  uid: 'abc123',
  payload: {
    values: {
      answer: 'Hello there',
      engagementKey: 'eng123',
      oppKey: 'opp123',
      teamKey: 'team123'
    }
  }
};

const updateCommand:CommandMembershipsUpdate = {
  domain: 'Memberships',
  action: 'update',
  uid: 'abc123',
  payload: {
    key: 'mem123',
    values: {
      isAccepted: true
    }
  }
};

const removeCommand:CommandMembershipsRemove = {
  domain: 'Memberships',
  action: 'remove',
  uid: 'abc123',
  payload: {
    key: 'mem123'
  }
};

test.serial('create', async function(t) {
  const [{streamName, data}] = await StreamTransform(createCommand, service);
  t.is(streamName, 'data.firebase');
  t.is(data.domain, 'Memberships');
  t.is(data.action, 'create');
  t.is(data.key, 'eng123-team123-opp123');
  t.deepEqual(data.values, {
    answer: 'Hello there',
    engagementKey: 'eng123',
    oppKey: 'opp123',
    teamKey: 'team123'
  });
});

test.serial('update', async function(t) {
  const [{streamName, data}] = await StreamTransform(updateCommand, service);
  t.is(streamName, 'data.firebase');
  t.is(data.domain, 'Memberships');
  t.is(data.action, 'update');
  t.is(data.key, 'mem123');
  t.deepEqual(data.values, {
    isAccepted: true
  });
});

test.serial('remove', async function(t) {
  const [{streamName, data}] = await StreamTransform(removeCommand, service);
  t.is(streamName, 'data.firebase');
  t.is(data.domain, 'Memberships');
  t.is(data.action, 'remove');
  t.is(data.key, 'mem123');
});
