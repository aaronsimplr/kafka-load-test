import { expect } from 'chai';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import { app, server } from '@/index';
import { env } from '@/services/Environment'
import jwt from 'jsonwebtoken';
import { exampleAccessRole } from '@/config/Constants'

const appRoot = env.globalRoutePrefix;

describe("routes", () => {
    let token;
    beforeEach(() => {
        const user = {roles: [exampleAccessRole]};
        token = jwt.sign(user, env.appContext.jwtSecret || "", {
            expiresIn: '1h',
          });

    });
    afterAll(() => {
        server.close();
    });
    describe("/status", () => {
        it('does return the status', async () => {
            const response = await request(app).get(`/${appRoot}/status`).expect(StatusCodes.OK);
            expect(response.body).to.deep.equal({ code: 0, message: 'server is alive!' });
        });
    });

    describe("/multiply", () => {
        it("can multiply positive numbers", async () => {
            const response = await request(app).post(`/${appRoot}/multiply`).set({ token: token }).send({x: 5, y: 6}).expect(StatusCodes.OK);
            expect(response.body).to.deep.equal({ code: 0, message: 'multiplication successfull', data: 30 });
        });

        it("can multiply negative numbers", async () => {
            const response = await request(app).post(`/${appRoot}/multiply`).set({ token: token }).send({x: -5, y: -6}).expect(StatusCodes.OK);
            expect(response.body).to.deep.equal({ code: 0, message: 'multiplication successfull', data: 30 });
        });

        it("can multiply a negative and a positive number", async () => {
            const response = await request(app).post(`/${appRoot}/multiply`).set({ token: token }).send({x: -5, y: 6}).expect(StatusCodes.OK);
            expect(response.body).to.deep.equal({ code: 0, message: 'multiplication successfull', data: -30 });
        });

        it("can multiply by zero", async () => {
            const response = await request(app).post(`/${appRoot}/multiply`).set({ token: token }).send({x: 5, y: 0}).expect(StatusCodes.OK);
            expect(response.body).to.deep.equal({ code: 0, message: 'multiplication successfull', data: 0 });
        });

        it("does validate x is a number", async () => {
            const response = await request(app).post(`/${appRoot}/multiply`).set({ token: token }).send({x: "anything", y: 0}).expect(StatusCodes.BAD_REQUEST);
            expect(response.body).to.deep.equal({ code: 20, message: '\"x\" must be a number' });
        });

        it("does validate y is a number", async () => {
            const response = await request(app).post(`/${appRoot}/multiply`).set({ token: token }).send({x: 0, y: "anything"}).expect(StatusCodes.BAD_REQUEST);
            expect(response.body).to.deep.equal({ code: 20, message: '\"y\" must be a number' });
        });


        it("does validate y is missing", async () => {
            const response = await request(app).post(`/${appRoot}/multiply`).set({ token: token }).send({x: 0}).expect(StatusCodes.BAD_REQUEST);
            expect(response.body).to.deep.equal({ code: 20, message: '\"y\" is required' });
        });

        it("does validate x is missing", async () => {
            const response = await request(app).post(`/${appRoot}/multiply`).set({ token: token }).send({y: 0}).expect(StatusCodes.BAD_REQUEST);
            expect(response.body).to.deep.equal({ code: 20, message: '\"x\" is required' });
        });

    });

    describe("/divide", () => {
        it("can divide positive numbers", async () => {
            const response = await request(app).post(`/${appRoot}/divide`).set({ token: token }).send({x: 30, y: 6}).expect(StatusCodes.OK);
            expect(response.body).to.deep.equal({ code: 0, message: 'multiplication successfull', data: 5 });
        });

        it("can divide negative numbers", async () => {
            const response = await request(app).post(`/${appRoot}/divide`).set({ token: token }).send({x: -30, y: -6}).expect(StatusCodes.OK);
            expect(response.body).to.deep.equal({ code: 0, message: 'multiplication successfull', data: 5 });
        });

        it("can divide a negative and a positive number", async () => {
            const response = await request(app).post(`/${appRoot}/divide`).set({ token: token }).send({x: -30, y: 6}).expect(StatusCodes.OK);
            expect(response.body).to.deep.equal({ code: 0, message: 'multiplication successfull', data: -5 });
        });

        it("does not divide by zero", async () => {
            const response = await request(app).post(`/${appRoot}/divide`).set({ token: token }).send({x: 5, y: 0}).expect(StatusCodes.BAD_REQUEST);
            expect(response.body).to.deep.equal({"code": 1, "message": "Divide by zero error"});
        });

        it("does validate x is a number", async () => {
            const response = await request(app).post(`/${appRoot}/divide`).set({ token: token }).send({x: "anything", y: 0}).expect(StatusCodes.BAD_REQUEST);
            expect(response.body).to.deep.equal({ code: 20, message: '\"x\" must be a number' });
        });

        it("does validate y is a number", async () => {
            const response = await request(app).post(`/${appRoot}/divide`).set({ token: token }).send({x: 0, y: "anything"}).expect(StatusCodes.BAD_REQUEST);
            expect(response.body).to.deep.equal({ code: 20, message: '\"y\" must be a number' });
        });


        it("does validate y is missing", async () => {
            const response = await request(app).post(`/${appRoot}/divide`).set({ token: token }).send({x: 0}).expect(StatusCodes.BAD_REQUEST);
            expect(response.body).to.deep.equal({ code: 20, message: '\"y\" is required' });
        });

        it("does validate x is missing", async () => {
            const response = await request(app).post(`/${appRoot}/divide`).set({ token: token }).send({y: 0}).expect(StatusCodes.BAD_REQUEST);
            expect(response.body).to.deep.equal({ code: 20, message: '\"x\" is required' });
        });

    });


    describe("/divideRethrow", () => {
        it("can divide positive numbers", async () => {
            const response = await request(app).post(`/${appRoot}/divideRethrow`).set({ token: token }).send({x: 30, y: 6}).expect(StatusCodes.OK);
            expect(response.body).to.deep.equal({ code: 0, message: 'multiplication successfull', data: 5 });
        });

        it("throwing at top level for divide by 0", async () => {
            await request(app).post(`/${appRoot}/divideRethrow`).set({ token: token }).send({x: 30, y: 0}).expect(StatusCodes.INTERNAL_SERVER_ERROR);
        });

    });

    describe("404", ()=> {
        it("does return json when a route is not found", async () => {
            const response = await request(app).post(`/${appRoot}/unknown`).expect(StatusCodes.NOT_FOUND);
            expect(response.body).to.deep.equal({"code": 100, "message": "This is not what you are looking for!"});
        });
    });

    describe("401", () => {
        it("does return json when unauthorized malformed/or expired", async () => {
            const response = await request(app).post(`/${appRoot}/multiply`).set({ token: "abacabb" }).expect(StatusCodes.UNAUTHORIZED);
            expect(response.body.code).to.equal(102);
        });
    })
});