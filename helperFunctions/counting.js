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

    return wordCountArr.slice(0, 25);
};


const filterWords = (words) => {
    const specialCharactersRegex = /[[.,/{}[\]().|&!;-=]/;
    const jsKeywordsRegex = /\b(instanceof|var|if|else|function)\b/i;
    return words.filter((word) => {
        return !specialCharactersRegex.test(word) && !jsKeywordsRegex.test(word);
    });
};

const getCountInformation = (webPageUrl, axiosResponse) => {
    const html = axiosResponse.data;

    const $ = cheerio.load(html);
    const bodyText = $("body").text();
    const words = bodyText.split(/\s+/);

    const filteredWords = filterWords(words);

    const wordCount = filteredWords.length;

    return {
        webPageUrl,
        totalWordCount: wordCount,
        destructuredWordCount: getWordOccurrences(filteredWords),
    };
};

module.exports = {
    getCountInformation: getCountInformation,
    getWordOccurrences: getWordOccurrences,
    filterWords: filterWords,
};
