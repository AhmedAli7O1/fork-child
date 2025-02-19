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

function functionWithComplexArgs(obj: Record<string, any>, arr: any[]) {
  return { receivedObject: obj, receivedArray: arr };
}

function functionWithLargePayload(data: any[]) {
  return 'Large payload received';
}

async function functionWithNestedPromises() {
  const result = await Promise.resolve(
    await Promise.resolve('Nested promises resolved')
  );
  return result;
}

function functionWithNoArgs() {
  return 'No arguments';
}

function functionWithMixedArgs(str: string, num: number, bool: boolean) {
  return { string: str, number: num, boolean: bool };
}

function functionWithUndefinedAndNull(undefinedArg: undefined, nullArg: null) {
  return { undefinedArg, nullArg };
}

register([
  syncFunction,
  asyncFunction,
  throwError,
  functionWithArgs,
  functionReturningPromise,
  delayedFunction,
  functionWithComplexArgs,
  functionWithLargePayload,
  functionWithNestedPromises,
  functionWithNoArgs,
  functionWithMixedArgs,
  functionWithUndefinedAndNull,
]);

export const one = 1;