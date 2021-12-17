function proto_random(){
  
}


function random_but_color() {
	// This array stores colors to be used 
	const RED = '#ff0000', BLUE = '#0384fc', ORANGE = '#fc6b03', GREEN = '#bafc03';
	const COLORS = [RED, BLUE, ORANGE, GREEN];

	div = document.getElementById("QuestionsDiv");
	label_list = div.querySelectorAll(".colbut")
	
	// Randomizes COLORS array 
	COLORS.sort(() => .5 - Math.random());

	// count will serve to access colors in COLORS.
	let i, count = 0;
	for(i = 0; i <= label_list.length - 1; i++){
		let random_color = COLORS[count++];

		// Attributes the element a random color
		label_list[i].style.color = random_color;
		
		// If count = 4 it means we reached the end of the array COLORS,
		// time to reset the index.
		if (count == 4) count = 0;
	}
}

random_but_color()
