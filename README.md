# Node-Request
[![Build Status](https://travis-ci.org/Merkll/node-requests.svg?branch=develop)](https://travis-ci.org/Merkll/node-requests) [![Coverage Status](https://coveralls.io/repos/github/Merkll/node-requests/badge.svg?branch=develop)](https://coveralls.io/github/Merkll/node-requests?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/6f999e00dc9ab8c22795/maintainability)](https://codeclimate.com/github/Merkll/node-requests/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/6f999e00dc9ab8c22795/test_coverage)](https://codeclimate.com/github/Merkll/node-requests/test_coverage)
An npm module for generic Node.js requests handling. This module was inspired to be use with AWS lambda function while allowing easy integration with server frameworks. This module has been tested and works with express.js.

This allows request to be made like conventional function invocation.

## Code style
Airbnb javascript style was used in entirety of this project


## Getting Started

These instructions seek to get your copy of the project up and running on your local machine for development and testing purposes. For deployment check the deployment section.

### Prerequisites

What things you need to install the software and how to install them

```
Ensure you have Node.js and npm installed
```

### Installing as Npm module
```npm i node-request ``` 

### Installing For testing and development
Clone this project ```git clone https://github.com/Merkll/.git```
Run ```npm install``` to install all dependencies

## Using alone

* ### ES6
```
import NodeRequest from 'node-request';

const Router = NodeRequest.Router(); // the router
const app = NodeRequest.register(); // the request handler

Router.get('/user/:user', (req) => {
  const { user } = req.params;
  return `Hello from node by ${user}`;
});

const entry = async (event) => {
  const data = await app(event);
  console.log(data); // Hello from node by Kehinde
};

entry({ path: '/user/Kehinde', method: 'get' });

```

* ### ES5
```
const NodeRequest = require('node-request');

const Router = NodeRequest.Router(); // the router 
const app = NodeRequest.register(); // the request handler

Router.get('/user/:user', (req) => {
  const user = req.params.user;
  return `Hello from node by ${user}`;
});

const entry = (event) => {
  app(event).then(result => console.log(result)); 
  // Hello from node by Kehinde
};

entry({ path: '/user/Kehinde', method: 'get' });

```

## Using with Express

* ### ES6
```
import NodeRequest from 'node-request';
import express from 'express';

const app = express();
const port = process.env.PORT || 5000;

const nodeApp = NodeRequest.register('express');
const Router = NodeRequest.Router(); // the router 

Router.get('/user/:user', (req) => {
  const { user } = req.params;
  res.send(`Hello from node by ${user}`);
});

app.use(nodeApp)

export default app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

```

* ### ES5
```
const NodeRequest = require('node-request');
const express = require('exress');

const app = express();
const port = process.env.PORT || 5000;

const nodeApp = NodeRequest.register('express');
const Router = NodeRequest.Router(); // the router 

Router.get('/user/:user', (req, res) => {
  const user = req.params.user;
  res.send(`Hello from node by ${user}`);
});

app.use(nodeApp)

export default app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

```

## Parameters
* event/request : The first parameter passed to the NodeRequest app. This object should have a ```path``` and ```method``` property. The request gets modified with request paramerter as ```req.parms``` if it exist.

Note: Other parameters can be passed in to the app and can be retrieved from the method handler in argument positions they were passed in.

### Router Methods
* ```app.use(function[req, done, ...])```: The done function must be called to return control inorder to continue execution. All other parameters passed into app can be accessed after done.

* ```app.method[ get | post | all ](path, function[req, ...])```


## License
MIT License

Copyright (c) 2019 toluwase

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

ISC © [toluwase]()