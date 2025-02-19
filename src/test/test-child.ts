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

register([syncFunction, asyncFunction, throwError]);

export const one = 1;