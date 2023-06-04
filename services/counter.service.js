"use strict";

const axios = require("axios");
const urlValidator = require("../helperFunctions/validation");
const countInformation = require("../helperFunctions/counting");

class PrefacedUrlError extends Error {
    constructor() {
        super("Error! URL must be prefaced with http:// or https://");
        this.name = "PrefacedUrlError";
    }
}

class InvalidURLError extends Error {
    constructor(url) {
        super(`Error! Invalid URL: ${url}`);
        this.name = "InvalidURLError";
    }
}

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
                    throw new PrefacedUrlError();
                }
                if (!urlValidator.isValidURL(ctx.params.webPageUrl)) {
                    throw new InvalidURLError(ctx.params.webPageUrl);
                }

                try {
                    const response = await axios.get(ctx.params.webPageUrl);
                    return countInformation.getCountInformation(ctx.params.webPageUrl, response);
                } catch (error) {
                    console.log(error.message);
                    return error.message;
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

