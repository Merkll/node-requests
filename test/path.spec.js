/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import NodePath from '../src/libs/paths';

describe('NodePath', () => {
  it('Should add path with handlers', () => {
    const data = NodePath.addPathActions('/', 'get', () => {}, () => {});
    expect(data.path).to.eql('/');
  });
  it('Should throw error if no handler is specified', () => {
    expect(() => NodePath.addPathActions('/', 'get')).to.throw();
  });

  describe('Get', () => {
    it('Should register get request', () => {
      const data = NodePath.get('/', () => {}, () => {});
      expect(data).to.be.eql(NodePath);
    });
    it('Should throw error if no handler is specified', () => {
      expect(() => NodePath.get('/')).to.throw();
    });
  });

  describe('Post', () => {
    it('Should register post request', () => {
      const data = NodePath.post('/', () => {});
      expect(data).to.be.eql(NodePath);
    });
    it('Should throw error if no handler is specified', () => {
      expect(() => NodePath.post('/')).to.throw();
    });
  });

  describe('Put', () => {
    it('Should register post request', () => {
      const data = NodePath.put('/', () => {});
      expect(data).to.be.eql(NodePath);
    });
    it('Should throw error if no handler is specified', () => {
      expect(() => NodePath.put('/')).to.throw();
    });
  });

  describe('Patch', () => {
    it('Should register post request', () => {
      const data = NodePath.patch('/', () => {});
      expect(data).to.be.eql(NodePath);
    });
    it('Should throw error if no handler is specified', () => {
      expect(() => NodePath.patch('/')).to.throw();
    });
  });

  describe('All', () => {
    it('Should register handler for all requests', () => {
      const data = NodePath.all('/', () => {});
      expect(data).to.be.eql(NodePath);
    });
    it('Should throw error if no handler is specified', () => {
      expect(() => NodePath.all('/')).to.throw();
    });
  });

  describe('Gets Paths', () => {
    it('Should return paths', () => {
      const { paths } = NodePath;
      expect(paths).to.not.be.undefined;
    });
  });

  describe('Path Match', () => {
    it('Should return paths', () => {
      const { paths } = NodePath;
      expect(paths).to.not.be.undefined;
    });
    it('Should return matched path', () => {
      NodePath.get('/about/:user/:id', () => {});
      const path = NodePath.match('/about/john/89');
      expect(path).to.not.be.undefined;
      expect(path).to.not.be.null;
    });
    it('Should return null for  unmatched path', () => {
      NodePath.get('/about/:user/:id', () => {});
      const path = NodePath.match('/about/john/');
      expect(path).to.be.null;
    });
    it('Should match based on regex', () => {
      NodePath.get('/about/:user/:id?', () => {});
      const path = NodePath.match('/about/john/');
      expect(path).to.not.be.null;
    });
  });

  describe('Middleware', () => {
    it('Should add middleares', () => {
      NodePath.use(() => {});
      expect(NodePath.middlewares).to.not.be.empty;
    });
  });
});
