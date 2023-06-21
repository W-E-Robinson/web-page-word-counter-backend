"use strict";

const axios = require("axios");

const { ServiceBroker } = require("moleculer");
const CounterService = require("../../../../services/counter.service");
const urlValidator = require("../../../../helperFunctions/validation");
jest.mock("../../../../helperFunctions/validation");

describe("Test 'counter' service", () => {
    let broker = new ServiceBroker({ logger: false });
    broker.createService(CounterService);

    beforeAll(() => broker.start());
    afterAll(() => broker.stop());

    describe("Test 'counter.count' action", () => {
        describe("Happy path", () => {
            test("should return word count for sample1.html", async () => {
                urlValidator.isPrefacedUrl.mockReturnValue(true);
                urlValidator.isValidURL.mockReturnValue(true);

                const htmlContent = fs.readFileSync(path.resolve(__dirname, "./mocks/sample1.html"), "utf-8");
                axios.get.mockResolvedValueOnce({
                    data: htmlContent
                });

                const response = await broker.call("counter.count", { webPageUrl: "./mocks/sample1.html" });
                console.log(response);
                expect(response.totalWordCount).toBe(18);
            });

            xtest("should return word count for sample2.html", async () => {
                const response = await broker.call("counter.count", { webPageUrl: "./mocks/sample3.html" });
                expect(response.totalWordCount).toBe(18);
            });

            xtest("should return word count for sample3.html", async () => {
                const response = await broker.call("counter.count", { webPageUrl: "./mocks/sample2.html" });
                expect(response.totalWordCount).toBe(18);
            });
        });

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
