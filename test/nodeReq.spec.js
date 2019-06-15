/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import NodeReq from '../src/node-req';

describe('NodeReq', () => {
  it('Should get NodeReq mode', () => {
    expect(NodeReq.mode).to.be.null;
  });

  it('should register mode', () => {
    const data = NodeReq.register('express');
    expect(data).to.not.be.undefined;
    expect(NodeReq.mode).to.eql('express');
  });
  it('should register mode defaulting to null', () => {
    const data = NodeReq.register();
    expect(data).to.not.be.undefined;
    expect(NodeReq.mode).to.be.null;
  });

  describe('Router', () => {
    it('should register Router', () => {
      const data = NodeReq.Router();
      expect(data).to.not.be.undefined;
    });
    it('should hanadle request', async () => {
      NodeReq.Router().get('/user/:id', req => `Hello ${req.params.id}`);
      const data = await NodeReq.register('express')({ path: '/user/45' });
      expect(data).to.not.be.undefined;
      expect(data).to.eql('Hello 45');
    });
    it('should add params to existing req params', async () => {
      NodeReq.Router().get('/user/:id', req => `Hello ${req.params.id}`, () => 'Last handler');
      const request = { path: '/user/45', params: { name: 'Josh' } };
      await NodeReq.register('express')(request);
      const { params } = request;
      expect(params).to.not.be.undefined;
      expect(params.name).to.eql('Josh');
      expect(params.id).to.eql('45');
    });
  });

  describe('Router Middleware', () => {
    it('should add middlewares', async () => {
      NodeReq.Router()
        .use((req, done) => {
          done();
        })
        .use((req, done) => {
          done();
        });
      expect(NodeReq.Router().middlewares).to.have.length(2);
    });
    it('should excute middlewares', async () => {
      const executed = await NodeReq.executeMiddlewares({});
      expect(executed).to.not.be.undefined;
    });
  });
});
