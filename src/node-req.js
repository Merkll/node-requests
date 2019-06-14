
const Private = new WeakMap();

class NodeReq {
  constructor() {
    Private.set(this, {
      mode: null,
      setMode: (mode) => { Private.get(this).mode = mode; },
    });
  }

  get mode() {
    return Private.get(this).mode;
  }

  // registers nodeReq mode
  register(mode) {
    Private.get(this).setMode(mode);
    return this;
  }
}


export default new NodeReq();
