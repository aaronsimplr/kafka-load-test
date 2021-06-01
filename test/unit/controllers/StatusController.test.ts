
import { expect } from "chai";
import { StatusController } from '@/controllers/StatusController';
import { StatusCodes } from 'http-status-codes';

describe("Status Controller", () => {
    describe("getStatus", () => {
        let request: any = {}, response: any = {};
        beforeEach(() => {
            request = {};
            response.status = (status) => {
                expect(status).to.equal(StatusCodes.OK);
                return { send: (response) => {
                        expect(response).to.deep.equal({code: 0, message: "server is alive!"});
                    }
                }
            };
        });

        it("can get the status", () => {
            StatusController.getStatus(request, response);
        });
    })
});

