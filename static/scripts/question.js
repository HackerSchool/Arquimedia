function deleteComment(id, csrftoken){
	// This function will make an Ajax request to delete a certain comment
	let token = document.getElementsByName("csrfmiddlewaretoken")[0].value;
	let url = "http://localhost:8000/exame/delete_comment/" + id;
	let request = new XMLHttpRequest();
	
	request.open("POST", url);

	request.onreadystatechange = function() {
		if(this.readyState === 4 && this.status === 200) {
			let comment = document.getElementById("comment" + id);
			removeFadeOut(comment, 500);
		}
	}

	request.setRequestHeader("X-CSRFToken", token);

	request.send();
}

function removeFadeOut( el, speed ) {
    var seconds = speed/1000;
    el.style.transition = "opacity "+seconds+"s ease";

    el.style.opacity = 0;
    setTimeout(function() {
        el.parentNode.removeChild(el);
    }, speed);
}

