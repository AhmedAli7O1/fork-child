import { fork as forkProcess, ChildProcess, ForkOptions } from 'node:child_process';
import { ForkReturn, ResponseMessage } from './interfaces.js';
import { randomUUID } from 'node:crypto';


export function fork(modulePath: URL | string, options?: ForkOptions) {
  const child: ChildProcess = forkProcess(modulePath, options);
  const callbacks: Map<string, (data: any) => void> = new Map();
  
  child.on('message', (message: ResponseMessage) => {
    if (message.id && callbacks.has(message.id)) {
      const callback = callbacks.get(message.id);
      if (callback) {
        if (message.error) {
          callback(Promise.reject(new Error(message.error)));
        } else {
          callback(Promise.resolve(message.result));
        }
      }
      callbacks.delete(message.id);
    }
  });

  const proxy = new Proxy(
    {},
    {
      get(_, prop: string) {

        if (prop === 'child') {
          return child;
        }

        return (...args: any[]) => {
          return new Promise((resolve, reject) => {
            const id = randomUUID();
            callbacks.set(id, resolve);
            try {
              child.send({ id, functionName: prop, args });
            } catch (err) {
              callbacks.delete(id);
              reject(err);
            }
          });
        };
      },
    }
  );

  return {
    child,
    functions: proxy
  } as ForkReturn;
}