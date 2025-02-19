import { register } from '../register.js';

function syncFunction() {
  return 'sync response';
}

async function asyncFunction() {
  return 'async response';
}

function throwError() {
  throw new Error('Test error');
}

function functionWithArgs(arg1: string, arg2: number) {
  return `Received ${arg1} and ${arg2}`;
}

function functionReturningPromise() {
  return Promise.resolve('Promise resolved');
}

function delayedFunction() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Delayed response');
    }, 500);
  });
}

register([syncFunction, asyncFunction, throwError, functionWithArgs, functionReturningPromise, delayedFunction]);

export const one = 1;