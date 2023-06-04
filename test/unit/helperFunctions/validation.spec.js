const { isPrefacedUrl, isValidURL } = require("../../../helperFunctions/validation");

describe("isPrefacedUrl", () => {
    test("returns true for a URL with http:// prefix", () => {
        const result = isPrefacedUrl("http://example.com");
        expect(result).toBe(true);
    });

    test("returns true for a URL with https:// prefix", () => {
        const result = isPrefacedUrl("https://example.com");
        expect(result).toBe(true);
    });

    test("returns false for a URL without http:// or https:// prefix", () => {
        const result = isPrefacedUrl("example.com");
        expect(result).toBe(false);
    });
});

describe("isValidURL", () => {
    test("returns true for a valid URL", () => {
        const result = isValidURL("https://example.com");
        expect(result).toBe(true);
    });

    test("returns false for an invalid URL", () => {
        const result = isValidURL("invalid-url");
        expect(result).toBe(false);
    });
});

