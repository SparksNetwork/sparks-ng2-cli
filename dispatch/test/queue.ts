test(__filename, 'makeQueueHandler', {
  'success': async function(t) {
    const {spy} = require('sinon');
    const callback = spy(() => Promise.resolve(true));
    const progress = spy();
    const resolve = spy();
    const reject = spy();
    const handler = makeQueueHandler(callback);

    await handler({
      domain: 'test',
      action: 'test',
      _id: 'abc123',
      payload: 'test',
      uid: '123abc',
    }, progress, resolve, reject);

    t.true(callback.calledOnce, 'callback called once');
    t.deepEqual(callback.getCall(0).args[0], {
      domain: 'test',
      action: 'test',
      key: 'abc123',
      payload: 'test',
      uid: '123abc',
    });
    t.true(resolve.calledOnce, 'resolve called once');
    t.equal(reject.callCount, 0, 'reject never called');
  },
  'failure': async function(t) {
    const {spy} = require('sinon');
    const callback = spy(() => Promise.reject('error'));
    const progress = spy();
    const resolve = spy();
    const reject = spy();
    const handler = makeQueueHandler(callback);

    await handler({
      domain: 'test',
      action: 'test',
      _id: 'abc123',
      payload: 'test',
      uid: '123abc',
    }, progress, resolve, reject);

    t.true(callback.calledOnce, 'callback called once');
    t.deepEqual(callback.getCall(0).args[0], {
      domain: 'test',
      action: 'test',
      key: 'abc123',
      payload: 'test',
      uid: '123abc',
    });
    t.equal(resolve.callCount, 0, 'resolve never called');
    t.true(reject.calledOnce, 'reject never called');
    t.equal(reject.getCall(0).args[0], 'error');
  }
});
