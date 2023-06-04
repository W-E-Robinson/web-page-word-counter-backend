"use strict";

const axios = require("axios");
const urlValidator = require("../helperFunctions/validation");
const countInformation = require("../helperFunctions/counting");

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
                if (!urlValidator.isPrefacedUrl(ctx.params.webPageUrl)) {
                    return "Error! URL must be prefaced with http:// or https://";
                }
                if (!urlValidator.isValidURL(ctx.params.webPageUrl)) {
                    return `Error! Invalid URL: ${ctx.params.webPageUrl}`;
                }

                try {
                    const response = await axios.get(ctx.params.webPageUrl);

                    return countInformation.getCountInformation(ctx.params.webPageUrl, response);
                } catch (error) {
                    console.log(error);
                    return `Error! Failed to fetch URL: ${ctx.params.webPageUrl}`;
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

