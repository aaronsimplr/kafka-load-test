import { expect } from 'chai';
import { ExampleService } from '@/services/ExampleService';

describe("ExampleService", () => {
    describe("multiply", () => {
        it("can multiply positive numbers", () => {
            expect(ExampleService.multiply(5, 2)).to.equal(10);
        });

        it("can multiply a negative and a positive number", () => {
            expect(ExampleService.multiply(5, -2)).to.equal(-10);
        });

        it("can multiply two negative numbers", () => {
            expect(ExampleService.multiply(-5, -2)).to.equal(10);
        });

        it("can multiply by zero", () => {
            expect(ExampleService.multiply(-5, 0)).to.equal(0);
        });
    });

    describe("divide", () => {
        it("can divide positive numbers", () => {
            expect(ExampleService.divide(10, 2)).to.equal(5);
        });

        it("can divide a negative and a positive number", () => {
            expect(ExampleService.divide(10, -2)).to.equal(-5);
        });

        it("can divide two negative numbers", () => {
            expect(ExampleService.divide(-10, -2)).to.equal(5);
        });

        it("does throw an error when dividing by zero", () => {
            try {
                ExampleService.divide(-5, 0)
            } catch (error) {
                expect(error.message).to.equal("Divide by zero error");
            }
            
        });
    });
});

