async function stringSimilarity(string) {
    // count the number of words in string
    let wordCount = string.split(' ').length;
    // count the number of sentences in string
    let sentenceCount = string.split('. ').length;
    // count the number of characters in string
    let charCount = string.length;
    // split the string into two strings separated by sentence
    let splitString = string.split(/[.!?]/);
    let firstString = splitString[0];
    let secondString = splitString[1];
    // 
    // 
    // build a levenshtein distance matrix for the two strings
    let levenshteinMatrix = [];
    for (let i = 0; i <= firstString.length; i++) {
        levenshteinMatrix[i] = [];
        for (let j = 0; j <= secondString.length; j++) {
            if (i === 0) levenshteinMatrix[i][j] = j;
            else if (j === 0) levenshteinMatrix[i][j] = i;
            else levenshteinMatrix[i][j] = 0;
        }
    }
    // iterate over the matrix and calculate the levenshtein distance
    for (let i = 1; i <= firstString.length; i++) {
        for (let j = 1; j <= secondString.length; j++) {
            if (firstString[i - 1] === secondString[j - 1]) levenshteinMatrix[i][j] = levenshteinMatrix[i - 1][j - 1];
            else levenshteinMatrix[i][j] = Math.min(levenshteinMatrix[i - 1][j - 1] + 1, Math.min(levenshteinMatrix[i][j - 1] + 1, levenshteinMatrix[i - 1][j] + 1));
        }
    }
    // return the levenshtein distance
    let levenshteinDistance = levenshteinMatrix[firstString.length][secondString.length];
    // parsefloat
    function similarity(firstString, secondString) {
        let longer = firstString;
        let shorter = secondString;
        if (firstString.length < secondString.length) {
            longer = secondString;
            shorter = firstString;
        }
        let longerLength = longer.length;
        if (longerLength === 0) {
            return 1.0;
        }
        return (longerLength - levenshteinDistance) / parseFloat(longerLength);
    }
    // jarowinkler
    function jaroWinkler(firstString, secondString) {
        let firstStringLength = firstString.length;
        let secondStringLength = secondString.length;
        if (firstStringLength === 0 && secondStringLength === 0) {
            return 1.0;
        }
        let searchRange = Math.floor((firstStringLength / 2.0) - 1);
        if (searchRange < 0) {
            searchRange = 0;
        }
        let matchIndexes = [];
        let matchedIndices = {};
        let matchedCount = 0;
        for (let i = 0; i < firstStringLength; i++) {
            let start = Math.max(0, i - searchRange);
            let end = Math.min(i + searchRange + 1, secondStringLength);
            for (let j = start; j < end; j++) {
                if (!matchedIndices[j]) {
                    if (firstString[i] === secondString[j]) {
                        matchIndexes.push([i, j]);
                        matchedIndices[j] = true;
                        matchedCount++;
                        break;
                    }
                }
            }
        }
        let transpositions = 0;
        for (let i = 0; i < matchIndexes.length; i++) {
            let [firstMatch, secondMatch] = matchIndexes[i];
            if (firstMatch === 0 || secondMatch === 0) {
                continue;
            }
            if (firstString[firstMatch - 1] !== secondString[secondMatch - 1]) {
                transpositions++;
            }
        }
        transpositions /= 2.0;
        let prefix = 0;
        while (prefix < firstStringLength && prefix < secondStringLength && firstString[prefix] === secondString[prefix]) {
            prefix++;
        }
        let score = ((matchedCount / firstStringLength) + (matchedCount / secondStringLength) + ((matchedCount - transpositions) / matchedCount)) / 3.0;
        let weight = score + (prefix / firstStringLength) * 0.1;
        return weight;
    }
    // cosine similarity
    function cosineSimilarity(firstString, secondString) {
        let firstStringLength = firstString.length;
        let secondStringLength = secondString.length;
        if (firstStringLength === 0 && secondStringLength === 0) {
            return 1.0;
        }
        let dotProduct = 0.0;
        let firstStringVector = [];
        let secondStringVector = [];
        for (let i = 0; i < firstStringLength; i++) {
            firstStringVector[i] = 0;
        }
        for (let i = 0; i < secondStringLength; i++) {
            secondStringVector[i] = 0;
        }
        for (let i = 0; i < firstStringLength; i++) {
            firstStringVector[firstString.charCodeAt(i) - 97]++;
        }
        for (let i = 0; i < secondStringLength; i++) {
            secondStringVector[secondString.charCodeAt(i) - 97]++;
        }
        for (let i = 0; i < 26; i++) {
            dotProduct += firstStringVector[i] * secondStringVector[i];
        }
        let firstStringMagnitude = 0.0;
        let secondStringMagnitude = 0.0;
        for (let i = 0; i < 26; i++) {
            firstStringMagnitude += firstStringVector[i] * firstStringVector[i];
            secondStringMagnitude += secondStringVector[i] * secondStringVector[i];
        }
        firstStringMagnitude = Math.sqrt(firstStringMagnitude);
        secondStringMagnitude = Math.sqrt(secondStringMagnitude);
        return dotProduct / (firstStringMagnitude * secondStringMagnitude);
    }
    //  sorensen-dice
    function sorensenDice(firstString, secondString) {
        let firstStringLength = firstString.length;
        let secondStringLength = secondString.length;
        if (firstStringLength === 0 && secondStringLength === 0) {
            return 1.0;
        }
        let intersection = 0;
        let union = 0;
        for (let i = 0; i < firstStringLength; i++) {
            if (firstString[i] === secondString[i]) {
                intersection++;
            }
            union++;
        }
        for (let i = 0; i < secondStringLength; i++) {
            if (firstString[i] === secondString[i]) {
                intersection++;
            }
            union++;
        }
        return intersection / union;
    }
    // trigram similarity
    function trigramSimilarity(firstString, secondString) {
        let firstStringLength = firstString.length;
        let secondStringLength = secondString.length;
        if (firstStringLength === 0 && secondStringLength === 0) {
            return 1.0;
        }
        let firstStringTrigrams = [];
        let secondStringTrigrams = [];
        for (let i = 0; i < firstStringLength - 2; i++) {
            firstStringTrigrams[firstString.substring(i, i + 3)] = 0;
        }
        for (let i = 0; i < secondStringLength - 2; i++) {
            secondStringTrigrams[secondString.substring(i, i + 3)] = 0;
        }
        let intersection = 0;
        for (let i = 0; i < firstStringLength - 2; i++) {
            if (firstStringTrigrams[firstString.substring(i, i + 3)] !== undefined) {
                intersection++;
            }
        }
        for (let i = 0; i < secondStringLength - 2; i++) {
            if (secondStringTrigrams[secondString.substring(i, i + 3)] !== undefined) {
                intersection++;
            }
        }
        return intersection / (firstStringLength + secondStringLength - intersection);
    }

    // build a word cloud
    function buildWordCloud(text) {
        let wordCloud = {};
        let words = text.split(/\s+/);
        for (let i = 0; i < words.length; i++) {
            let word = words[i];
            if (wordCloud[word] === undefined) {
                wordCloud[word] = 0;
            }
            wordCloud[word]++;
        }
        // sort the words by frequency, but keep wordcloud as a single level
        let wordCloudArray = [];
        for (let word in wordCloud) {
            wordCloudArray.push([word, wordCloud[word]]);
        }
        wordCloudArray.sort(function (a, b) {
            return b[1] - a[1];
        });
        // flatten the wordcloudarray
        return wordCloudArray;
    }
    let reply = {
        text: string,
        sentenceCount: sentenceCount,
        charCount: charCount,
        wordCount: wordCount,
        wordCloud: buildWordCloud(string),
        levenshteinDistance: levenshteinDistance,
        note: "calculates the minimum number of operations you must do to change 1 string into another. The higher the number, the less similar the strings are.",
        parseFloat: similarity(firstString, secondString),
        note2: "calculates a fraction representing the edit distance of levenshtein distance. The closer the number is to 1, the more similar the strings are.",
        cosine: cosineSimilarity(firstString, secondString),
        note3: "calculates the similarity between two strings using the cosine similarity formula. Cosine similarity is a metric, helpful in determining, how similar the data objects are irrespective of their size. The closer the number is to 1, the more similar the strings are.",
        sorensenDice: sorensenDice(firstString, secondString),
        note4: "A statistic used to gauge the similarity of two samples. It is equal to twice the number of elements (tokens/words) common to both sets, divided by the sum of the number of elements in each set. It is symmetric and does not require a large number of elements to achieve a high degree of similarity. The higher the number, the more similar the samples are.",
        jaroWinkler: jaroWinkler(firstString, secondString),
        note4: "The Jaro–Winkler distance is a string metric measuring an edit distance between two sequences. The lower the Jaro–Winkler distance for two strings is, the more similar the strings are. The Jaro–Winkler distance is a metric that is designed to work with short strings, such as first names, and is based on the Jaro distance, but incorporates a modification to the Winkler modification to account for prefixes.",
        trigramSimilarity: trigramSimilarity(firstString, secondString),
        note5: "A trigram is a group of three consecutive characters taken from a string. We can measure the similarity of two strings by counting the number of trigrams they share. This simple idea turns out to be very effective for measuring the similarity of words in many natural languages. The closer the number is to 100, the more similar the strings are.",
        firstSentence: firstString,
        secondSentence: secondString
    }

    return reply;

}
