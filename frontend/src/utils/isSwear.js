import list from './badWords.json';

const badWords = list.words;

function escapeRegExp(string) {
	// eslint-disable-next-line no-useless-escape
	return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
}

export default function isSwear(query) {
	var badWordsPresent = badWords.filter((badWord) => {
		var regex = '\\b';
		regex += escapeRegExp(badWord);
		regex += '\\b';
		return new RegExp(regex, 'i').test(query);
	});

	if (badWordsPresent.length > 0) {
		return true;
	} else {
		return false;
	}
}
