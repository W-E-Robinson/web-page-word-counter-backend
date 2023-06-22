const { getWordOccurrences, filterWords } = require("../../../helperFunctions/counting");

describe("getWordOccurrences", () => {
    test.each([
        [["and", "Website", "and", "umbrella", "website", "and"], [
            { word: "and", count: 3 },
            { word: "website", count: 2 },
            { word: "umbrella", count: 1 },
        ]],
        [[], []],
    ])("returns the word occurrences in descending order", (words, expected) => {
        const result = getWordOccurrences(words);
        expect(result).toEqual(expected);
    });
});

describe("filterWords", () => {
    test.each([
        [["and", "website", "!", "if", "else", "umbrella"], ["and", "website", "if", "else", "umbrella"]],
        [["and", "website", "!", "?", " ", "umbrella"], ["and", "website", "umbrella"]],
        [[], []],
    ])("filters out grammar leaving only words", (words, expected) => {
        const result = filterWords(words);
        expect(result).toEqual(expected);
    });
});

