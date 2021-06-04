# Why do we need clean code and how?

## Learn to start a Project slow, and keep it slow
Typically a project starts really fast, devs can directly add different features with a really fast pace. However, if that keeps goind, the project progress will gradually slow down, and maybe a year or two, you will find it really hard to add any more features to the project. Then company would feel like we should go faster than this, and start to hiring more people to join the team, however, that is never the right solution to speed up a project. New devs need to be trained and start to learn the existing code, it is those devs who made a mess at first place are goind to train them and let them write code with the existing way. Without doubts, the messy code will keep going and the progress will continue slowing down.

And that's why we should start a project slow, and keep it slow while doing it. No one writes clean code at first implementation, it is the refactor and time you spent on cleaning the code that makes it project lasts.

Clean code is written by somebody who cares. The author of the clean code cares about the readers.

Clean code is no suprises, no WTFs while reading it.

## What are the rules to make your code polite

1. What is the optimal number of lines of code within a function? The smaller the better, keep extracting things out of a function until your function is only doing one thing.
2. How many indent level can be used within a function? No more than 2 indent level
3. Function Argument:
  1. Do not use more than 3 arguments to pass into a function, it's hard for devs to use and remember what's actually get passed into the function. If you really have more than 3 arguments to pass, then creat a data structure for the argument and gather the arguments together into a single class.
  2. Try to avoid passing boolean arguments into a function: if you pass a boolean, which means you will have a if-else clause in your function, then how about extract the if-else into two functions, which increases the readibility for the function itself. You just call one in the if clause and call the other in the other case.
4. Avoid switch statements: one function should only do one thing.
5. No side-effects： `calloc` and `free`, `subscribe` and `unsubscribe` observables, `open` and `close` files... those will lead to memory leak, cannot open file anymore
6. Try block should cover the whole function, and only have one function within the try block to throw potential exceptions.
7. Do Not repeat yourself


## Comments within your Code
Each comment is a failure you admitted that you cannot express yourself with code.

Javadocs are useful for API, but don't do that for non-API part.

## Line length and file size
Typical file size should be around 20 ~ 1000 lines of code, it's really rare case that it is more than 1000. If you have some file more than 1000 lines, you need to refactor it

Line length should be somewhere between 0 ~ 80, it's rude to ask reader to slide to the right with mouse, and most of time, the reader won't do that, they will just skip it....

## Names

### Length of Names
1. Variable names
The length of variable name should be vary based on their scope, most of the time, the larger the scope is the longer the variable name should be. Because in global scope, you need variables to be unique, so that you can get the idea what that variable is with first look.

2. Function names
The lenght of function name should be smaller with the scope growth, because a function with larger scope, it should be more abstract, it will be called more often and it should not do something really small. With scope decreases, we should have longer names for functions because it should do something really tiny and specific

3. Class names
Should be following same rules as Function names

### Distinguish Names Meaningfully
Make sure you have meaningful names for each of the function, and readers should easily identify which function is doing what without messing with the names.

## Design Patterns
Why Design Patterns are still useful? 

Yes, those are pretty old ideas and strategies, but it still gives us a quick way to achieve an agreement between developers. We should be really fast on identify the scenarios that fits the current requirements/design.