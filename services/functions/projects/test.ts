import service from './index';
import {test} from 'ava';
import {StreamTransform} from "../../test/StreamTransform";
import {MockFirebase} from "../../test/MockFirebase";
import {establishConnection} from "../../lib/ExternalFactories/Firebase";

const createMessage:CommandProjectsCreate = {
  domain: 'Projects',
  action: 'create',
  uid: 'abc123',
  payload: {
    values: {
      name: 'My project'
    }
  }
};

const updateMessage:CommandProjectsUpdate = {
  domain: 'Projects',
  action: 'update',
  uid: 'abc123',
  payload: {
    key: 'proj123',
    values: {
      description: 'new description'
    }
  }
};

const removeMessage:CommandProjectsRemove = {
  domain: 'Projects',
  action: 'remove',
  uid: 'abc123',
  payload: {
    key: 'proj123'
  }
};

const db = new MockFirebase();

test.beforeEach(() => {
  establishConnection('projects', db);
  db.database().ref().child('Users').child('abc123').set('ghj123');
});

test.afterEach(() => { db.reset(); });

test.serial('create', async function(t) {
  const [dataMessage] = await StreamTransform(createMessage, service);

  t.is(dataMessage.streamName, 'data.firebase');
  t.is(dataMessage.partitionKey, 'abc123');
  const {data} = dataMessage;
  t.is(data.domain, 'Projects');
  t.is(data.action, 'create');
  t.truthy(data.key);
  t.deepEqual(data.values, {
    name: 'My project',
    ownerProfileKey: 'ghj123'
  });
});

test.serial('update', async function(t) {
  const [dataMessage] = await StreamTransform(updateMessage, service);

  t.is(dataMessage.streamName, 'data.firebase');
  t.is(dataMessage.partitionKey, 'abc123');
  const {data} = dataMessage;
  t.is(data.domain, 'Projects');
  t.is(data.action, 'update');
  t.is(data.key, 'proj123');
  t.deepEqual(data.values, {
    description: 'new description'
  });
});

test.serial('remove', async function(t) {
  const [dataMessage] = await StreamTransform(removeMessage, service);

  t.is(dataMessage.streamName, 'data.firebase');
  t.is(dataMessage.partitionKey, 'abc123');
  const {data} = dataMessage;
  t.is(data.domain, 'Projects');
  t.is(data.action, 'remove');
  t.is(data.key, 'proj123');
});
