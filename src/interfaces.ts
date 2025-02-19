import { ChildProcess } from 'node:child_process';

export interface ResponseMessage {
  id: string;
  result?: any;
  error?: any;
}

export interface Message {
  id: string;
  functionName: string;
  args: any[];
}

export type FunctionDefinition = (...args: any[]) => any;

export type ForkedFunctions = Record<string, (...args: any[]) => Promise<any>>;

export interface ForkReturn {
  child: ChildProcess;
  functions: ForkedFunctions;
}
