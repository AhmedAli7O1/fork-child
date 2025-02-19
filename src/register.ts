import { FunctionDefinition, Message } from './interfaces.js';

// if (!process.send) {
//   throw new Error('Not running as a child process');
// }

const functionMap:  Map<string, FunctionDefinition> = new Map();

process.on('message', async (message: Message) => {

  const functionRef = getFunction(message);

  const {id, args} = message;

  try {
    const fnReturn = functionRef(...args);
    
    const result = fnReturn instanceof Promise ? await fnReturn : fnReturn;

    process.send({ id, result });
    
  } catch (err: any) {
    process.send({ id, error: err.message });
  }
});

process.on('disconnect', () => {
  console.log('Parent exited, shutting down child...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM, exiting...');
  process.exit(0);
});

function getFunction(message: Message) {
  if (!message || typeof message !== 'object') return;
  
  const { id, functionName } = message;

  if (!id || !functionName) return;

  const functionRef = functionMap.get(functionName);

  if (!functionRef) {
    process.send({ id, error: `Function '${functionName}' not found` });
    return;
  }

  return functionRef;
}

export function register(functions: FunctionDefinition[]) {
  for (const fn of functions) {
    if (typeof fn !== 'function') {
      throw new Error('All registered functions must be functions');
    }

    if (functionMap.has(fn.name)) {
      throw new Error(`Function '${fn.name}' already registered`);
    }

    functionMap.set(fn.name, fn);
  }
}