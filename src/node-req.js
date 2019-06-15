import NodePath from './libs/paths';
import awsLambda from './libs/aws-lambda';

const Private = new WeakMap();

class NodeReq {
  constructor() {
    Private.set(this, {
      mode: null,
      modeHandlers: {
        'aws-lambda': awsLambda,
      },
      middlewares: [],
      setMode: (mode = null) => { Private.get(this).mode = mode; },
      setRouter: (router) => { Private.get(this).router = this.router || router; },
    });
  }

  get mode() {
    return Private.get(this).mode;
  }

  get router() {
    return Private.get(this).router;
  }

  async handlePathRequest(req, ...others) {
    const request = req;
    const { path } = req;
    let { method = 'get' } = req;
    method = method.toLowerCase();
    const pathData = this.router.match(path);
    if (!pathData) return null;
    const handler = pathData.handlers[method] || pathData.handlers.all;
    request.params = request.params ? { ...request.params, ...pathData.params } : pathData.params;
    if (!handler) return null;
    const data = await this.executeHandlers(handler, request, ...others);
    return data[data.length - 1];
  }

  modifyRequest(req) {
    const handler = Private.get(this).modeHandlers[this.mode];
    if (handler) return handler.modifyRequest(req);
    return req;
  }

  async handleRequest(req, ...others) {
    const request = this.modifyRequest(req);
    const data = await this.executeMiddlewares(request, ...others);
    return data;
  }

  // eslint-disable-next-line class-methods-use-this
  async executeHandlers(handlers, ...data) {
    const returnedData = handlers.map(handler => handler(...data));
    return Promise.all(returnedData);
  }

  executeMiddlewares(req, ...others) {
    return new Promise(async (resolve, reject) => {
      const { middlewares } = this.router;
      let currentMiddlewareIndex = 0;

      const done = async (err) => {
        if (err) reject(new Error(err));
        currentMiddlewareIndex += 1;
        // eslint-disable-next-line no-use-before-define
        const data = await callMiddleware();
        return data;
      };

      const callMiddleware = async () => {
        if (!middlewares[currentMiddlewareIndex]) {
          return resolve(await this.handlePathRequest(req, ...others));
        }
        const data = await middlewares[currentMiddlewareIndex](req, done, ...others);
        return data;
      };
      await callMiddleware();
    });
  }

  // registers nodeReq mode
  register(mode) {
    Private.get(this).setMode(mode);
    return this.handleRequest.bind(this);
  }

  Router() {
    Private.get(this).setRouter(NodePath);
    return this.router;
  }
}


export default new NodeReq();
