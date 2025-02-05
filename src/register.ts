export type FunctionMap = Record<string, (...args: any[]) => any>;

export interface Message {
  id: string;
  method: string;
  args: any[];
}

export function register(functions: FunctionMap) {
  process.on('message', async (message: Message) => {
    if (!message || typeof message !== 'object') return;
    const { id, method, args } = message;

    if (!id || !method || !(method in functions)) return;

    try {
      const result = await functions[method](...args);
      process.send?.({ id, result });
    } catch (err: any) {
      process.send?.({ id, error: err.message });
    }
  });
}

process.on('disconnect', () => {
  console.log('Parent exited, shutting down child...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM, exiting...');
  process.exit(0);
});
