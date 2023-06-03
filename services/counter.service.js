"use strict";

const urlValidator = require("../helperFunctions/validation");

const mockData = {
    webPageUrl: "mockUrl",
    totalWordCount: 10,
    destructuredWordCount: [
        { word: "the", count: 100 },
        { word: "and", count: 90 },
        { word: "umbrella", count: 2 },
    ],
};


module.exports = {
    name: "counter",

    settings: {},

    dependencies: [],

    actions: {
        count: {
            rest: {
                method: "GET",
                path: "/counter"
            },
            params: {
                webPageUrl: "string"
            },
            async handler(ctx) {
                if (!urlValidator.isValidURL(ctx.params.webPageUrl)) {
                    return `Error! Invalid URL: ${ctx.params.webPageUrl}.`;
                }
                return mockData;
            }
        },
    },

    events: {},

    methods: {},

    created() { },

    async started() { },

    async stopped() { }
};
