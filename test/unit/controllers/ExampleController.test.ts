import { expect } from "chai";
import { StatusCodes } from 'http-status-codes';
import { ExampleController } from '@/controllers/ExampleController';
import { ExampleService } from '@/services/ExampleService';

import * as sinon from 'sinon';

const sandbox = sinon.createSandbox();

describe("Example Controller", () => {
    describe("multiply", () => {
        let request: any = {}, response: any = {}, expectedStatus = {status: StatusCodes.OK}, expectedResponse = {}, result = 5;
        beforeEach(() => {
            request = {params: { x: 1, y: 5}};
            result = 5;
            expectedStatus = {status: StatusCodes.OK}; 
            expectedResponse = {code: 0, message: "multiplication successfull", data: result};
            response.status = (status) => {
                expect(status).to.equal(expectedStatus.status);
                return { send: (response) => {
                        expect(response).to.deep.equal(expectedResponse);
                    }
                }
            };

            sandbox.stub(ExampleService, "multiply").callsFake((x, y) => {
                expect(x).to.equal(request.params.x);
                expect(y).to.equal(request.params.y);
                return result;
            });
        });

        afterEach(() => {
            sandbox.restore();
        });

        it("can multiply", () => {
            ExampleController.multiply(request, response);
        });

        it("does return bad requet when x is not a number", () => {
            request.params.x = "abacabb";
            expectedStatus.status = StatusCodes.BAD_REQUEST;
            expectedResponse = {code: 1, message: `expected NaN to equal '${request.params.x}'`}
            ExampleController.multiply(request, response);
        });

        it("does return bad requet when y is not a number", () => {
            request.params.y = "abacabb";
            expectedStatus.status = StatusCodes.BAD_REQUEST;
            expectedResponse = {code: 1, message: `expected NaN to equal '${request.params.y}'`}
            ExampleController.multiply(request, response);
        });
    });

    describe("divide", () => {
        let request: any = {}, response: any = {}, expectedStatus = {status: StatusCodes.OK}, expectedResponse = {}, result = 5;
        beforeEach(() => {
            request = {params: { x: 10, y: 5}};
            result = 2;
            expectedStatus = {status: StatusCodes.OK}; 
            expectedResponse = {code: 0, message: "multiplication successfull", data: result};
            response.status = (status) => {
                expect(status).to.equal(expectedStatus.status);
                return { send: (response) => {
                        expect(response).to.deep.equal(expectedResponse);
                    }
                }
            };

            sandbox.stub(ExampleService, "divide").callsFake((x, y) => {
                expect(x).to.equal(request.params.x);
                expect(y).to.equal(request.params.y);
                return result;
            });
        });

        afterEach(() => {
            sandbox.restore();
        });

        it("can divide", () => {
            ExampleController.divide(request, response);
        });

        it("does return bad requet when x is not a number", () => {
            request.params.x = "abacabb";
            expectedStatus.status = StatusCodes.BAD_REQUEST;
            expectedResponse = {code: 1, message: `expected NaN to equal '${request.params.x}'`}
            ExampleController.divide(request, response);
        });

        it("does return bad requet when y is not a number", () => {
            request.params.y = "abacabb";
            expectedStatus.status = StatusCodes.BAD_REQUEST;
            expectedResponse = {code: 1, message: `expected NaN to equal '${request.params.y}'`}
            ExampleController.divide(request, response);
        });
    });
});