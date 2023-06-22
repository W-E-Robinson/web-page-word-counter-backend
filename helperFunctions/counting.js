const cheerio = require("cheerio");

const getWordOccurrences = (words) => {
    const wordMap = new Map();

    words.forEach((word) => {
        const lowercaseWord = word.toLowerCase();
        if (wordMap.has(lowercaseWord)) {
            wordMap.set(lowercaseWord, wordMap.get(lowercaseWord) + 1);
        } else {
            wordMap.set(lowercaseWord, 1);
        }
    });

    const wordCountArr = Array.from(wordMap, ([word, count]) => ({ word, count }));

    wordCountArr.sort((a, b) => b.count - a.count);

    return wordCountArr;
};

const filterWords = (words) => {
    console.log(words);
    words.shift();
    words.pop();
    const nonGrammarCharsRegex = /[^a-zA-Z0-9\s]/;
    //const jsKeywordsRegex = /\b(instanceof|var|if|else|function)\b/i;
    return words.filter((word) => {
        return !nonGrammarCharsRegex.test(word.trim());// && !jsKeywordsRegex.test(word);
    });
};

const getCountInformation = (webPageUrl, axiosResponse) => {
    const html = axiosResponse.data;

    const $ = cheerio.load(html);
    $("script").remove();
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
