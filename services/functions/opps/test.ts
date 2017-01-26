import {test} from 'ava';
import service from './index';
import {StreamTransform} from "../../test/StreamTransform";

const createCommand:CommandOppsCreate = {
  domain: 'Opps',
  action: 'create',
  uid: 'abc123',
  payload: {
    values: {
      projectKey: 'proj123',
      name: 'My new opp'
    }
  }
};

const updateCommand:CommandOppsUpdate = {
  domain: 'Opps',
  action: 'update',
  uid: 'abc123',
  payload: {
    key: 'opp123',
    values: {
      description: "desc of opp"
    }
  }
};

const removeCommand:CommandOppsRemove = {
  domain: 'Opps',
  action: 'remove',
  uid: 'abc123',
  payload: {
    key: 'opp123'
  }
};

test.serial('create', async function(t) {
  const [{streamName, data}] = await StreamTransform(createCommand, service);
  t.is(streamName, 'data.firebase');
  t.is(data.domain, 'Opps');
  t.is(data.action, 'create');
  t.truthy(data.key);
  t.deepEqual(data.values, {
    projectKey: 'proj123',
    name: 'My new opp'
  });
});

test.serial('update', async function(t) {
  const [{streamName, data}] = await StreamTransform(updateCommand, service);
  t.is(streamName, 'data.firebase');
  t.is(data.domain, 'Opps');
  t.is(data.action, 'update');
  t.is(data.key, 'opp123');
  t.deepEqual(data.values, {
    description: 'desc of opp'
  });
});

test.serial('remove', async function(t) {
  const [{streamName, data}] = await StreamTransform(removeCommand, service);
  t.is(streamName, 'data.firebase');
  t.is(data.domain, 'Opps');
  t.is(data.action, 'remove');
  t.is(data.key, 'opp123');
});


