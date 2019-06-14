import NodePath from './libs/paths';

const Private = new WeakMap();

class NodeReq {
  constructor() {
    Private.set(this, {
      mode: null,
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

  async handleRequest(req, ...others) {
    const request = req;
    const { path, method = 'get' } = req;
    const pathData = this.router.match(path);
    if (!pathData) return null;
    const handler = pathData.handlers[method];
    request.params = request.params ? { ...request.params, ...pathData.params } : pathData.params;
    if (!handler) return null;
    const data = await this.executeHandlers(handler, request, ...others);
    return data[data.length - 1];
  }

  // eslint-disable-next-line class-methods-use-this
  async executeHandlers(handlers, ...data) {
    const returnedData = handlers.map(handler => handler(...data));
    return Promise.all(returnedData);
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
