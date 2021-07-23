// run cmd: node myFile.js

const pendingTimers = [];
const pendingOsTasks = [];
const pendingOperations = [];

// node program function execute
// new timers, tasks, operations are recorded from myFile running
myFile.runContents(); 

function shouldContinue() {
  // check 1: any pending setTimeout, setInterval, setImmediate
  // check 2: any pending operating system tasks? (Like server listening to port)
  // check 3: any pending long running operations? (Like fs module)
  return pendingTimers.length || pendingOsTasks.length || pendingOperations.length;
}

// Entire body executes in one 'tick'
while(shouldContinue()) {
  //1. Node looks at pendingTimers and sees if any functions
  //   are ready to be called. setTimeout, setInterval

  //2. Node looks at pending OS tasks and pending Operations 
  //   see if relevant callbacks needed to be executed 

  //3. Node pauses execution. Continue when...
  //  - a new pendingOsTask is done
  //  - a new pendingOperation is done
  //  - a timer is about to complete

  //4. Look at pendingTimers. call any setImmediate

  //5. Handle any 'close' events
  //   For example: readStream.on('close', () => { console.log('clean up')}),
}


// exit back to terminal