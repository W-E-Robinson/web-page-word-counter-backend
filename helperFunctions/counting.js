const cheerio = require("cheerio");

//const mockData = {
//    webPageUrl: "mockUrl",
//    totalWordCount: 10,
//    destructuredWordCount: [
//        { word: "the", count: 100 },
//        { word: "and", count: 90 },
//        { word: "umbrella", count: 2 },
//    ],
//};

const getCountInformation = (webPageUrl, axiosResponse) => {
    const html = axiosResponse.data;
    console.log(html);

    const $ = cheerio.load(html);
    const text = $.text();
    const words = text.split(/\s+/);
    console.log(words);
    const wordCount = words.length;

    return {
        webPageUrl,
        totalWordCount: wordCount,
        destructuredWordCount: [],//TO_DO: word count
    };
};

module.exports = {
    getCountInformation: getCountInformation
};
