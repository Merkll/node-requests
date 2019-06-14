import pathRegExp from 'path-to-regexp';

const Private = new WeakMap();

class NodePath {
  constructor() {
    Private.set(this, {
      paths: {},
    });
  }

  addPathActions(path, httpMethod, ...handlers) {
    if (handlers.length === 0) throw new Error('At least one function handler needed');
    const pathData = Private.get(this).paths[path] || {};
    const handlerData = pathData.handlers || {};
    Private.get(this).paths[path] = {
      path,
      handlers: { ...handlerData, ...{ [httpMethod]: handlers } },
    };
    return Private.get(this).paths[path];
  }

  get paths() {
    return Private.get(this).paths;
  }

  static getParams(key, matchData) {
    if (!matchData) return {};
    return key.reduce((obj, data, i) => {
      const params = obj;
      if (matchData[i + 1]) params[data.name] = matchData[i + 1];
      return params;
    }, {});
  }

  // maps path to registered action
  match(path) {
    const { paths } = this;
    const options = {
      sensitive: false,
      strict: false,
      end: true,
    };
    const matchedPaths = Object.entries(paths).filter((singlePath) => {
      const pathData = singlePath;
      const [route, handler] = pathData;
      const keys = [];
      const re = pathRegExp(route, keys, options);
      const isMatched = re.exec(path);
      handler.params = NodePath.getParams(keys, isMatched);
      return !!isMatched;
    });
    return matchedPaths[0] ? matchedPaths[0][1] : null;
  }

  // handles get requests
  get(path, ...handlers) {
    this.addPathActions(path, 'get', ...handlers);
    return this;
  }

  // handles post requests
  post(path, ...handlers) {
    this.addPathActions(path, 'post', ...handlers);
    return this;
  }

  // all other requests
  all(path, ...handlers) {
    this.addPathActions(path, 'all', ...handlers);
    return this;
  }
}

export default new NodePath();
