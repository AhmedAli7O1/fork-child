# fork-child

`fork-child` is an easy-to-use Node.js module that provides a simple wrapper around the `fork` function of the `child_process` module. It enables seamless function invocation between parent and child processes using asynchronous messaging and supporting both ESM and CommonJS environments.

## Features
- 🚀 **Easy inter-process function calls**: Call functions in a child process from the parent process asynchronously.
- 🔄 **Supports synchronous and asynchronous functions**: Execute functions and return results, including promises.
- 📡 **Seamless messaging**: Handles communication between processes internally.
- 🔧 **Minimal setup required**: Simply register functions in the child process and call them from the parent.

---

## Installation
```sh
npm install fork-child
```

## Usage

### **Child Process (`child.js`)**
```typescript
import { register } from 'fork-child';

function one() {
  console.log('one');
}

function two() {
  return 'two';
}

async function three() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('three');
    }, 1000);
  });
}

register([one, two, three]);
```

### **Parent Process (`parent.js`)**
```typescript
import { fork } from 'fork-child';

const { functions } = fork('./child.js');

await functions.one();
console.log(await functions.two());
console.log(await functions.three());
```

## How It Works
1. The **child process** registers functions using `register()`.
2. The **parent process** forks the child process using `fork()`.
3. Calls to registered functions are automatically serialized and sent to the child.
4. The child executes the function and returns the result to the parent.
5. Errors in the child process are propagated back to the parent.

## Benefits
- Simplifies inter-process communication.
- Reduces boilerplate for managing child processes.
- Provides a structured way to handle async tasks in child processes.

## License
This project is licensed under the MIT License.

## Author
Developed by [Ahmed Ali](#https://github.com/AhmedAli7O1) 🚀