/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import awsLambda from '../src/libs/aws-lambda';

describe('AWS-lambda', () => {
  describe('modifyrequest', () => {
    it('Should modify request', () => {
      const req = {
        queryStringParameters: {},
        path: '/project/progress/323',
        pathParameters: {},
        httpMethod: 'GET',
        body: {},
      };
      const data = awsLambda.modifyRequest(req);
      expect(data.method).to.be.eql('get');
    });
    it('Should null query string', () => {
      const req = {
        queryStringParameters: null,
        path: '/project/progress/323',
        pathParameters: {},
        httpMethod: 'GET',
        body: {},
      };
      const data = awsLambda.modifyRequest(req);
      expect(data.method).to.be.eql('get');
    });
    it('Should handle null body', () => {
      const req = {
        queryStringParameters: null,
        path: '/project/progress/323',
        pathParameters: {},
        httpMethod: 'GET',
        body: null,
      };
      const data = awsLambda.modifyRequest(req);
      expect(data.method).to.be.eql('get');
    });
    it('Should null path params', () => {
      const req = {
        queryStringParameters: null,
        path: '/project/progress/323',
        pathParameters: null,
        httpMethod: 'GET',
        body: null,
      };
      const data = awsLambda.modifyRequest(req);
      expect(data.method).to.be.eql('get');
    });
    it('method should default to get', () => {
      const req = {
        queryStringParameters: null,
        path: '/project/progress/323',
        pathParameters: null,
        body: null,
      };
      const data = awsLambda.modifyRequest(req);
      expect(data.method).to.be.eql('get');
    });
  });
});
