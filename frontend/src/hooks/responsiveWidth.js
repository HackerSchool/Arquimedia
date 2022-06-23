export default function responsiveWidth(windowArray, min = null, max = null, coef = 1) {
	let size = coef * windowArray.width;

	if ((min !== null) & (size < min)) {
		size = min;
	}
	if ((max !== null) & (size > max)) {
		size = max;
	}

	return size;
}
