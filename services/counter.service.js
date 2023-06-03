"use strict";

const axios = require("axios");
const cheerio = require("cheerio");
const urlValidator = require("../helperFunctions/validation");

//const mockData = {
//    webPageUrl: "mockUrl",
//    totalWordCount: 10,
//    destructuredWordCount: [
//        { word: "the", count: 100 },
//        { word: "and", count: 90 },
//        { word: "umbrella", count: 2 },
//    ],
//};

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

                try {
                    const response = await axios.get(ctx.params.webPageUrl);
                    console.log(response);
                    const html = response.data;
                    console.log(html);

                    const $ = cheerio.load(html);
                    const text = $.text();
                    const words = text.split(/\s+/);
                    console.log(words);
                    const wordCount = words.length;

                    const result = {
                        webPageUrl: ctx.params.webPageUrl,
                        totalWordCount: wordCount,
                        destructuredWordCount: [],//TO_DO: word count
                    };

                    return result;
                } catch (error) {
                    console.log(error);
                    return `Error! Failed to fetch URL: ${ctx.params.webPageUrl}.`;
                }
            }
        },
    },

    events: {},

    methods: {},

    created() { },

    async started() { },

    async stopped() { }
};

