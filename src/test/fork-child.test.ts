import { fork } from '../fork.js';
import { expect } from 'chai';
import { ForkedFunctions, ForkReturn } from '../interfaces.js';

describe('fork-child', function () {
  let forkResult: ForkReturn;

  before(function () {
    const childUrl = new URL('test-child.ts', import.meta.url);
    forkResult = fork(childUrl);
  });

  it('should call a synchronous function', async function () {
    const result = await forkResult.functions.syncFunction();
    expect(result).to.equal('sync response');
  });

  it('should call an asynchronous function', async function () {
    const result = await forkResult.functions.asyncFunction();
    expect(result).to.equal('async response');
  });

  it('should handle errors from child', async function () {
    try {
      await forkResult.functions.throwError();
    } catch (err: any) {
      expect(err).to.be.an('error');
      expect(err.message).to.equal('Test error');
    }
  });

  it('should handle multiple simultaneous calls', async function () {
    const results = await Promise.all([
      forkResult.functions.syncFunction(),
      forkResult.functions.asyncFunction(),
      forkResult.functions.syncFunction(),
    ]);
    expect(results).to.deep.equal(['sync response', 'async response', 'sync response']);
  });

  it('should handle functions with arguments', async function () {
    const result = await forkResult.functions.functionWithArgs('arg1', 42);
    expect(result).to.equal('Received arg1 and 42');
  });

  it('should handle functions returning promises', async function () {
    const result = await forkResult.functions.functionReturningPromise();
    expect(result).to.equal('Promise resolved');
  });

  it('should handle functions with delayed execution', async function () {
    const result = await forkResult.functions.delayedFunction();
    expect(result).to.equal('Delayed response');
  });

  after(function () {
    forkResult.child.kill('SIGTERM');
  });
});
