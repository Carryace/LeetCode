// process.env.UV_THREADPOOL_SIZE = 5;
const https = require('https');
const crypto = require('crypto');
const fs = require('fs');

const start = Date.now();

function doRequest() {
  https
    .request('https://www.google.com', res => {
      res.on('data', () => {});
      res.on('end', () => {
        console.log(Date.now() - start);
      })
    })
    .end();
}

function doHash() {
  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    //gets executed after hash has been successfully calculated
    console.log('Hash: ', Date.now() - start);
  });
}

doRequest();

fs.readFile('multitask.js', 'utf8', () => {
  console.log('FS:', Date.now() - start);
})

doHash();
doHash();
doHash();
doHash();

// Think about what is the order of the console.logs
// Result:
// 289
// Hash:  1118
// FS: 1119
// Hash:  1125
// Hash:  1127
// Hash:  1146

// The keys are
// 1. understand how http calls different from the
//    normal libuv function with thread pools
// 2. understand how fs.readFile works:
//    fs.readFile actually splits into two parts
//    1). Read file stats from OS 
//    2). Based on stats, node knows how loarge the files is
//     and then starts to read it 
//   When waiting on result from 1) to get the file stats
//   thread pool has one thread left idle which is picked
//   up by pbkdf2 to do that hash and move fs.readFile task
//   to the waiting list so it will be picked up once next thred
//   is available, and that's why fs.readFile
//   is a bit late than the first pbkdf2 callback

// Typically fs.readFile is pretty fast, if we switch 
// the thread pool size to 5, then readFIle will be the first
// one to complete the callback