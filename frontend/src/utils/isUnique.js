export default function isUnique(value, index, self) {
	return self.indexOf(value) === index;
}
//Acts as a call back function for every element of an array, to see if they are unique
//Usefull for making an unique array from a redundant one
