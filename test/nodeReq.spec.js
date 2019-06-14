/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import NodeReq from '../src/node-req';

describe('NodeReq', () => {
  it('Should get NodeReq mode', () => {
    expect(NodeReq.mode).to.be.null;
  });

  it('should register mode', () => {
    const data = NodeReq.register('express');
    expect(data).to.eql(NodeReq);
    expect(NodeReq.mode).to.eql('express');
  });
});
