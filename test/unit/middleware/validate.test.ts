import * as sinon from 'sinon';
import { expect } from 'chai';
import { validate } from '@/middleware/Validate';
import { StatusCodes } from 'http-status-codes';

const sandbox = sinon.createSandbox();

describe('validate', () => {
  let request, response, next;
  beforeEach(() => {
    (request = {}), (response = {});
    next = sandbox.stub();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it('validate post params', async () => {
    request.body = { test: 'test' };
    response.status = () => {
      expect(true).to.be.false;
      // should not be called
    };
    const schema: any = {
      validate: (params) => {
        expect(params.test).to.equal('test');

        return {};
      },
    };
    const middleware = validate(schema);
    await middleware(request, response, next);
    sinon.assert.calledOnce(next);
  });

  it('validate get params', async () => {
    request.query = { test: 'test' };
    response.status = () => {
      expect(true).to.be.false;
      // should not be called
    };
    const schema: any = {
      validate: (params) => {
        expect(params.test).to.equal('test');

        return {};
      },
    };
    const middleware = validate(schema);
    await middleware(request, response, next);
    sinon.assert.calledOnce(next);
  });

  it('will return http status code of bad request when result has error', async () => {
    request.body = { test: 'test' };
    response.status = (status) => {
      expect(status).to.equal(StatusCodes.BAD_REQUEST);

      return {
        json: (obj) => {
          expect(obj.code).to.equal(20);
          expect(obj.message).to.equal('testing');
        },
      };
    };
    const schema: any = {
      validate: (params) => {
        expect(params.test).to.equal('test');

        return { error: { message: 'testing' } };
      },
    };
    const middleware = validate(schema);
    await middleware(request, response, next);
    sinon.assert.notCalled(next);
  });

  it('will return http status code of server error when an error occurs', async () => {
    request.body = { test: 'test' };
    response.status = (status) => {
      expect(status).to.equal(StatusCodes.INTERNAL_SERVER_ERROR);

      return {
        json: (obj) => {
          expect(obj.code).to.equal(21);
        },
      };
    };
    const schema: any = {
      validate: () => {
        throw new Error('test error');
      },
    };
    const middleware = validate(schema);
    await middleware(request, response, next);
    sinon.assert.notCalled(next);
  });
});
