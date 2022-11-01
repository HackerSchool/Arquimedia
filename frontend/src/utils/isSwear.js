import list from './badWords.json';

const badWords = list.words;

function escapeRegExp(string) {
	// eslint-disable-next-line no-useless-escape
	return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
}

export default function isSwear(query) {
	for (const badWord of badWords) {
		var regex = '\\b';
		regex += escapeRegExp(badWord);
		regex += '\\b';
		if (new RegExp(regex, 'i').test(query)) return true;
	}
}
