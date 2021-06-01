import { expect } from "chai";
import { env } from "@/services/EnvironmentForTest";

describe("Environment", () => {
    it("can get variable from env", () => {
        expect(env.globalRoutePrefix).to.equal("/apiTest");
    });
});