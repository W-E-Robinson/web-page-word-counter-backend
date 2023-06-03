"use strict";

const urlValidator = require("../helperFunctions/validation");

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
				return `Requested URL: ${ctx.params.webPageUrl}`;
			}
		},
	},

	events: {},

	methods: {},

	created() {},

	async started() {},

	async stopped() {}
};
