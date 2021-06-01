import * as  sinon from 'sinon';
import { expect } from 'chai';
import { StatusCodes } from 'http-status-codes';
import { hasRole } from '../../../src/middleware/HasRole';

const sandbox = sinon.createSandbox();

describe.only('hasRole', () => {
  let request, response, next;
  beforeEach(() => {
    (request = {}), (response = {});
    next = sandbox.stub();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it('can determine if a user has a role', async () => {
    request.user = { roles: ['test'] };
    response.status = () => {
      expect(true).to.be.false;
      // should not be called
    };
    const middleware = hasRole('test');
    await middleware(request, response, next);
    sinon.assert.calledOnce(next);
  });

  it('will return http status code of unauthorized when has no role', async () => {
    request.user = { roles: ['no test'] };
    response.status = (status) => {
      expect(status).to.equal(StatusCodes.FORBIDDEN);

      return {
        json: (obj) => {
          expect(obj.code).to.equal(10);
        },
      };
    };
    const middleware = hasRole('test');
    await middleware(request, response, next);
    sinon.assert.notCalled(next);
  });

  it('will return http status code of server error when an error occurs', async () => {
    request.user = {};
    response.status = (status) => {
      expect(status).to.equal(StatusCodes.INTERNAL_SERVER_ERROR);

      return {
        json: (obj) => {
          expect(obj.code).to.equal(11);
        },
      };
    };
    const middleware = hasRole('test');
    await middleware(request, response, next);
    sinon.assert.notCalled(next);
  });
});
