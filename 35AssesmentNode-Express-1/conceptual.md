### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
  Some ways of managing asynchronous code in javascript is trhought he use of callbacks, promises
    async, and await funciton.


- What is a Promise?
  a Promise is a  and object that represents the eventual completion of an asynchrounous operation. it holds back the funtion
    until something is finish to send the response.

- What are the differences between an async function and a regular function?
  The main difference bewteen an async function and a regular funtion in JS is in how they handle
    asynchrounous operations. regular function returns the value directly while async funciton always returns a promise.


- What is the difference between Node.js and Express.js?
  Node.js and Express.js are tools in building server-side applications in javascript, but they have different purposes.
  node.js provides  a platform for running javascript code on the server. Express.js simplifies the process of building web servers and apis by providing a higher-level, over Node.js

- What is the error-first callback pattern?
  the error first callback pattern is a common convention in NOde.js and Javascript for handling asynchronous operations, where the first argument of a callback function is reversed for an error  and the arguments are used for the result of the operation.

- What is middleware?
  middleware referes to functions that have access to the request, response and the next middleware funcitons in the request response cycle of a web application.

- What does the `next` function do?
  the next funciton in express is used to pass control to the next middleware function in the stack. it allows the current middleware to finish its execution and either hand off control to the next middleware in line or to the route handler if no more middleware is defined.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```

Prrformance: The await keyword causes each requet to be executed sequentially, which means the request waits for the previous one to complete before starting

Error handling: Lack of error handling, the code does not handle potential errors that could occur during the fetch operations.

Structure and naming: the naming is inconsistant it could use clear descriptive variable names. the urls are hardcocded which could use parameterizing to allow dynamic user requests.

