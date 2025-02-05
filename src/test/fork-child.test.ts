import { fork } from '../fork.js';
import { expect } from 'chai';


describe('fork-child', function () {
  let child: any;

  before(function () {
    const childUrl = new URL('test-child.ts', import.meta.url);
    const { proxy } = fork(childUrl);
    child = proxy;
  });

  it('should call a synchronous function', async function () {
    const result = await child.syncFunction();
    expect(result).to.equal('sync response');
  });

  it('should call an asynchronous function', async function () {
    const result = await child.asyncFunction();
    expect(result).to.equal('async response');
  });

  it('should handle errors from child', async function () {
    try {
      await child.throwError();
    } catch (err: any) {
      expect(err).to.be.an('error');
      expect(err.message).to.equal('Test error');
    }
  });
});
