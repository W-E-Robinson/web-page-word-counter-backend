const { isPrefacedUrl, isValidURL } = require("../../../helperFunctions/validation");

describe("isPrefacedUrl", () => {
    test.each([
        ["http://example.com", true],
        ["https://example.com", true],
        ["example.com", false],
    ])("returns true for a URL with http:// or https:// prefix", (url, expected) => {
        const result = isPrefacedUrl(url);
        expect(result).toBe(expected);
    });
});

describe("isValidURL", () => {
    test.each([
        ["https://example.com", true],
        ["invalid-url", false],
    ])("returns true for a valid URL", (url, expected) => {
        const result = isValidURL(url);
        expect(result).toBe(expected);
    });
});

