import { fork as forkProcess, ChildProcess, ForkOptions } from 'node:child_process';


interface ResponseMessage {
  id: string;
  result?: any;
  error?: any;
}

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
      get(_, methodName: string) {
        return (...args: any[]) => {
          return new Promise((resolve, reject) => {
            const id = Math.random().toString(36).substr(2, 9);
            callbacks.set(id, resolve);
            child.send({ id, method: methodName, args });
          });
        };
      },
    }
  );

  return {
    child,
    proxy,
  };
}

// child.kill('SIGTERM');

// process.on('exit', () => {
//   console.log('Parent exiting, killing child...');
//   child.kill('SIGTERM');
// });

