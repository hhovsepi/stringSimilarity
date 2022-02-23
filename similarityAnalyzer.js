// thank you: https://www.npmjs.com/package/string-similarity

addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    const {searchParams} = new URL(request.url)
    let first = searchParams.get("sentence") ?? 'enter sentence to match'; // is the string "Jonathan"
    let second = searchParams.get("keywords") ?? 'enter keywords to match'; // is the number 18
    // let a = searchParams.get('sentence') ?? 'John Doe takes walks in the park';
    // let b = searchParams.get('&keywords') ?? 'parks, recreation, walks';

function compareTwoStrings(first, second) {
	first = first.replace(/\s+/g, '')
	second = second.replace(/\s+/g, '')

	if (first === second) return 1; // identical or empty
	if (first.length < 2 || second.length < 2) return 0; // if either is a 0-letter or 1-letter string

	let firstBigrams = new Map();
	for (let i = 0; i < first.length - 1; i++) {
		const bigram = first.substring(i, i + 2);
		const count = firstBigrams.has(bigram)
			? firstBigrams.get(bigram) + 1
			: 1;

		firstBigrams.set(bigram, count);
	};

	let intersectionSize = 0;
	for (let i = 0; i < second.length - 1; i++) {
		const bigram = second.substring(i, i + 2);
		const count = firstBigrams.has(bigram)
			? firstBigrams.get(bigram)
			: 0;

		if (count > 0) {
			firstBigrams.set(bigram, count - 1);
			intersectionSize++;
		}
	}

	return (2.0 * intersectionSize) / (first.length + second.length - 2);
}
// console.log(dbResponse);
let reply = {
    "Sentence" : first,
    "keywords" : second,
    "Similarity Score" : compareTwoStrings(first, second)
}
    return new Response(JSON.stringify(reply, null, 2), {
        headers: {
            "content-type": "application/json;charset=UTF-8"
        }
    })

}