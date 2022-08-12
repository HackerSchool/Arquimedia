import list from './badWords.json';

const badWords = list.words;

function escapeRegExp(string) {
	// eslint-disable-next-line no-useless-escape
	return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
}

export default function isSwear(query) {
	let listIndex = 0;
	let swearing = false;

	while (!swearing && listIndex < badWords.length) {
		var badWord = badWords[listIndex];
		var regex = '\\b';
		regex += escapeRegExp(badWord);
		regex += '\\b';
		swearing = new RegExp(regex, 'i').test(query);
		listIndex++;
	}

	return swearing;
}
