const validUrlPattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(:\d{2,5})?(\/\S*)?$/i;

const isValidURL = (url) => {
    return validUrlPattern.test(url);
}

module.exports = {
    isValidURL: isValidURL
};
