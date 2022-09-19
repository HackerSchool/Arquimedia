export default function maxNumOccurences(array) {
	if (array.length == 0) return null;
	var modeMap = {};
	var maxEl = array[0],
		maxCount = 1;
	for (var i = 0; i < array.length; i++) {
		var el = array[i];
		if (modeMap[el] == null)
			modeMap[el] = 1; //Creates counter if no record has been made before
		else modeMap[el]++; //Adds counter if record has been made
		if (modeMap[el] > maxCount) {
			//if the counter is greater the previous maxCounter, it means that this element has appeared more times than the previous element that has appeared more times
			maxEl = el;
			maxCount = modeMap[el];
		}
	}
	return maxEl; //Element in an array which has appeared more times
}
