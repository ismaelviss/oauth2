const generateRandomString = function(length) {
    let randomString = '';
    const possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0987654321"

    for (var i = 0; i < length; i++) {
        randomString += possibleChars.charAt(
            Math.floor(Math.random() * possibleChars.length)
        );
    }

    return randomString;
};

module.exports = generateRandomString;