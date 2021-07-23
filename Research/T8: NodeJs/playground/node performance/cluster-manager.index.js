process.env.UV_THREADPOOL_SIZE = 1;
const cluster = require('cluster');

// the very first time to execute index.js, it will create a cluster manager
// which will help to manage later forked worker instance
// isMaster flag is only set to true for cluster manager
if (cluster.isMaster) {
  // This will cause index.js to be executed again but in child mode
  cluster.fork();
  cluster.fork();
  cluster.fork();
  cluster.fork();
  cluster.fork();
  cluster.fork();

} else {
  // Current in a child mode, going to act like a server instance
  // and do something else
  const express = require('express');
  const crypto = require('crypto');
  const app = express();

  // function doWork(duration) {
  //   const start = Date.now();
  //   while(Date.now() - start < duration) {}
  // }

  app.get('/', (req, res) => {
    // doWork(5000);
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
      res.send('Hi there');
    });
  });

  app.get('/fast', (req, res) => {
    res.send('This was fast!');
  })

  app.listen(3000);
}