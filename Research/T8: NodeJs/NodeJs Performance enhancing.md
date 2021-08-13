# NodeJs Performance Enhancing

## The real problem we have in NodeJs

Since nodeJs event loop is single thread mode, there is not much we can do about it, to enhance the nodeJs performance, we have two other workarounds:
1. Use Node in **Cluster** mode: run multiple copies of node instance within your server (Recommended)
2. Use Wroker Threads: to run background work for node instance (Experimental)

problem example in [node performance project](./plaground/../playground/node%20performance/index.js)
Where we have relatively large calculations to do when receiving a request, since nodeJs is a singel threaded app, the only thread is using to do the calculation and the incoming request has to wait til the current operation ends.

## NodeJs Cluster mode

Cluster mode can help matigate above problem caused by single threaded nodejs.

![Node cluster manager](./assets/Node%20cluster.png)

Cluster manager is only monitoring the health of each node instance belongs to it.

The very first we execute `index.js` with cluster, the cluster manager will be created, and based on our cluster configuration it will start to execute `index.js` again to create more worker instance for us like diagram below:


![Node cluster theory](./assets/Node%20cluster%20theory.png)

If we need more children, we can use `cluster.fork()` multiple times

## Benchmark NodeJs Performance
With the cluster manager implementation, we might be thinking that clustering is just the great way to speed up your app, however, it does not always do us good. From apache benchmarks tool we can run couple of tests to actually figure out whether adding more children instances will always help us address performance issue:

```
$ ab -c 50 -n 500 localhost:3000/
```

Above is an example of using `ab` (apache benchmarks) to execute a load test against `localhost:3000/`, it will fire total of 500 requests at a concurrency of 50. After we run above, apache benchmark tool can then provide us with a matrix on the time consumed for the request, like time consumed on quickest request, slowest request etc...

To better illustrate the problem, let's assume that we are running 2 worker instances forked from our cluster manager, and run
```
$ ab -c 6 -n 6 localhost:3000/
```

And then switch to 6 worker instances from the server and run above cmd again.

It would be clear on the result matrix provided from apache benchmarks that 6 worker instances server has actually much longer respond time compared with 2 worker instances nodeJs server. 

### Why increasing number of worker instances is not always good?

The reason is related to our CPU. Each worker instance will consume some CPU power, CPU needs to listen to it and switch between different instance to provide proper calculation power when request coming in. With more worker instances added in, CPU needs more time to watch, calculate and provide service to each instance, which will draw down the server response time significantly .

You might see when adding 1 or 2 worker instances using node cluster manager, the server response time is much quicker than a single worker instance, but with more worker instances you will need to consider the trade offs and come up with a proper number of instances that you want to set up on your server.

## Solution to nodeJs cluster mode -> PM2
`PM2` is a nodeJs cluster management tool that is currently used in most of nodeJs prod deployment.

`$ pm2 start index.js -i 0` 

it will start your app with clusters that pm2 feels fit, or you can enter some numbers there to have pm2 running with a fixed number of threads

`$ pm2 monit`

it starts a shell interface for you to better monitor how your app node is working

`$ pm2 delete index`

It can stop your app from running

Normally, we are not going to use it unless we have a very good reason for it
