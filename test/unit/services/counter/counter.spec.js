"use strict";

const axios = require("axios");
const fs = require("fs");
const path = require("path");

const { ServiceBroker } = require("moleculer");
const CounterService = require("../../../../services/counter.service");
const urlValidator = require("../../../../helperFunctions/validation");
jest.mock("../../../../helperFunctions/validation");
jest.mock("axios");

describe("Test 'counter' service", () => {
    let broker = new ServiceBroker({ logger: false });
    broker.createService(CounterService);

    beforeAll(() => broker.start());
    afterAll(() => broker.stop());

    describe("Test 'counter.count' action", () => {
        describe("Happy path", () => {
            beforeEach(() => {
                urlValidator.isPrefacedUrl.mockReturnValue(true);
                urlValidator.isValidURL.mockReturnValue(true);
            });

            test.each([
                [
                    "./mocks/sample1.html",
                    27,
                    [
                        { word: "sample", count: 6 },
                        { word: "text", count: 4 },
                        { word: "html", count: 2 },
                        { word: "1", count: 2 },
                        { word: "welcome", count: 1 },
                        { word: "to", count: 1 },
                        { word: "this", count: 1 },
                        { word: "is", count: 1 },
                        { word: "the", count: 1 },
                        { word: "content", count: 1 },
                        { word: "of", count: 1 },
                        { word: "it", count: 1 },
                        { word: "contains", count: 1 },
                        { word: "some", count: 1 },
                        { word: "for", count: 1 },
                        { word: "testing", count: 1 },
                        { word: "purposes", count: 1 },
                    ],
                ],
                [
                    "./mocks/sample2.html",
                    28,
                    [
                        { word: "sample", count: 6 },
                        { word: "additional", count: 4 },
                        { word: "text", count: 4 },
                        { word: "html", count: 2 },
                        { word: "2", count: 2 },
                        { word: "welcome", count: 1 },
                        { word: "to", count: 1 },
                        { word: "this", count: 1 },
                        { word: "is", count: 1 },
                        { word: "the", count: 1 },
                        { word: "content", count: 1 },
                        { word: "of", count: 1 },
                        { word: "it", count: 1 },
                        { word: "contains", count: 1 },
                        { word: "some", count: 1 },
                    ],
                ],
                [
                    "./mocks/sample3.html",
                    28,
                    [
                        { word: "sample", count: 6 },
                        { word: "different", count: 4 },
                        { word: "text", count: 4 },
                        { word: "html", count: 2 },
                        { word: "3", count: 2 },
                        { word: "welcome", count: 1 },
                        { word: "to", count: 1 },
                        { word: "this", count: 1 },
                        { word: "is", count: 1 },
                        { word: "the", count: 1 },
                        { word: "content", count: 1 },
                        { word: "of", count: 1 },
                        { word: "it", count: 1 },
                        { word: "includes", count: 1 },
                        { word: "some", count: 1 },
                    ],
                ],
            ])("should return word count and breakdown for %s", async (webPageUrl, expectedWordCount, expectedDestructuredWordCount) => {
                const htmlContent = fs.readFileSync(path.resolve(__dirname, webPageUrl), "utf-8");
                axios.get.mockResolvedValueOnce({
                    data: htmlContent,
                });

                const response = await broker.call("counter.count", { webPageUrl });
                expect(response.totalWordCount).toBe(expectedWordCount);
                expect(response.destructuredWordCount).toEqual(expectedDestructuredWordCount);
            });
        });

        describe("Unhappy paths", () => {
            test("should return an error when URL is not prefaced with http: or https:", async () => {
                urlValidator.isPrefacedUrl.mockReturnValueOnce(false);

                const response = await broker.call("counter.count", { webPageUrl: "www.google.com" });
                expect(response).toBe("Error! URL must be prefaced with http:// or https://");
            });
            test("should return an error when URL is not valid", async () => {
                urlValidator.isValidURL.mockReturnValueOnce(false);

                const response = await broker.call("counter.count", { webPageUrl: "https: www.google.com" });
                expect(response).toBe("Error! Invalid URL: https: www.google.com");
            });
        });
    });
});
