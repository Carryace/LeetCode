// customzie thread pool size
// process.env.UV_THREADPOOL_SIZE = 2;

const crypto = require('crypto');

const start = Date.now();
crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  //gets executed after hash has been successfully calculated
  console.log('1: ', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('2: ', Date.now() - start);
});

// By just running code above:
// If node were single threaded, we would see these above code
// use around 2s, 1s per pbkdf2 to hash the inputs. However,
// what we really see is these two console logs presents in almost
// the same time, this tells us that pbkdf2 is actually multi-threaded.


crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('3: ', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('4: ', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('5: ', Date.now() - start);
});

// if we add more than 4 pbkdf2 to execute, the first four will log
// almost the same time, the fifth one will wait till there are
// available threads from thread pool and it will take a little bit 
// less time than the previous 4 just because your Core CPU is not 
// multi-threading processing since the fifth one is the only thread
// it needs to run now.