# Internal of NodeJs

## What is NodeJs and Why do we need NodeJs
when we run commands like

`$ node index.js` 

we are invoking a node project, it uses it's own dependencies to execute the project.

![nodeJs internal structure](assets/NodeJs%20internal%20structure.png)

- **V8 engine** can help us to run javascript code outside of the browser (70% C++, 30% JS)
- **libuv** provide us access to OS like network, filesystem and help us to deal with concurrency. (100% C++)

NodeJs provides a nice interface for us to help relate our Javascript code to C++ code that are running in our machine. Another thing it does is to provide a wrapper to a set of useful APIs for developers to use in project, like http, fs, path, crypto. And those are directly connecting with `libuv` from lower level C++ code.

![nodeJs internal process](assets/NodeJs%20internal%20process.png)

## Threads and Node Event Loop
- Process: a running program instance
- Thread: a unit of instructions that CPU will need to execute
- Scheduler: it schedules thread to be executed by CPU

If we need to execute threads faster, we can
  - either add in more CPU to leverage the ability of calculate (increase ability of calculating)
  - or we can let OS scheduler to detect pause between instructions within a thread and execute other urgent thread during that pause. (increase ability of making arrangement)

Below is how Node Program works:

![nodeJs program](assets/NodeJs%20program%20overview.png)

Event loop is like a control structure to decide what should this one thread do at one given time.

The full lifecycle of event loop example is in [event_loop.js](playground/eventloop/event_loop.js)

![nodeJs eventloop](assets/NodeJs%20program%20eventloop.png)

People always say that nodeJs is a single threaded app, is it really true? Not actually, some of node standard functions in lib is **Not** single threaded

![single thread](assets/NodeJs%20single%20threaded%20concept.png)

To think of this in another aspect, if it is really single thread, then it is not fully utilizing the multi-core CPU resouces on our machine, which means it is not running fast enough or it actually could be faster.

This example in [threads.js](playground/eventloop/threads.js) explains that there are actually some functions that are not single threaded

![multi thread](assets/NodeJs%20thread%20pool.png)

By default, Libuv creats 4 threads in thread pool for complex operation usage. So, with one thread in event loop, and 4 threads in thread pool, we actually have 5 threads running for our nodeJs. For complex or expensive operations like `pbkdf2`, libuv will use these threads from thread pool to do computational tasks. These tasks will be counted as `pendingOperations` in [event_loop.js](playground/eventloop/event_loop.js) example, and fit into our event loop.

On the other hadn, node might also acheive multi threading without thread pool, for example, standard networking functions from node library(like `https`), libuv  hands requests to the operating system async helpers to deal with it. Node will just get notified when there is a response back. This can be counted as a `pendingOsTasks`