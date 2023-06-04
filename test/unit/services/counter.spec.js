"use strict";

const { ServiceBroker } = require("moleculer");
const CounterService = require("../../../services/counter.service");

describe("Test 'counter' service", () => {
    let broker = new ServiceBroker({ logger: false });
    broker.createService(CounterService);

    beforeAll(() => broker.start());
    afterAll(() => broker.stop());

    describe("Test 'counter.count' action", () => {
        describe("Unhappy paths", () => {
            test("should return an error when URL is not prefaced with http:// or https://", async () => {
                const response = await broker.call("counter.count", { webPageUrl: "www.google.com" });
                expect(response).toBe("Error! URL must be prefaced with http:// or https://");
            });
            test("should return an error when URL is not valid", async () => {
                const response = await broker.call("counter.count", { webPageUrl: "https:// www.google.com" });
                expect(response).toBe("Error! Invalid URL: https:// www.google.com");
            });
        });
    });
});
