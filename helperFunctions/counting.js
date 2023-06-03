const cheerio = require("cheerio");

const getWordOccurrences = (words) => {
    const wordMap = new Map();

    words.forEach((word) => {
        if (wordMap.has(word)) {
            wordMap.set(word, wordMap.get(word) + 1);
        } else {
            wordMap.set(word, 1);
        }
    });

    const wordCountArr = Array.from(wordMap, ([word, count]) => ({ word, count }));

    wordCountArr.sort((a, b) => b.count - a.count);

    return wordCountArr;
};


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
        destructuredWordCount: getWordOccurrences(words),
    };
};

module.exports = {
    getCountInformation: getCountInformation,
};
