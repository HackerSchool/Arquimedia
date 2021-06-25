function deleteComment(id){
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


function addComment(questionId, user){
	// This function will make an Ajax request to delete a certain comment
	let text = document.getElementById("CommentInput").value;
	console.log(text);
	let token = document.getElementsByName("csrfmiddlewaretoken")[0].value;
	let url = "http://localhost:8000/exame/add_comment";
	let request = new XMLHttpRequest();
	
	request.open("POST", url);
	request.responseType = 'json';

	request.onreadystatechange = function() {
		if(this.readyState === 4 && this.status === 200) {
			// Add comment visually
			const date = new Date(this.response["date"])
			const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

			let comments = document.getElementsByClassName("comments")[0]
			comments.innerHTML += `<div class="comment" id="comment${this.response["commentId"]}">
									<h3>${this.response["user"]} - ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} - 0</h3>
									<h6>${text}</h6>
									<button type="button" class="btn btn-danger" onclick="deleteComment(${this.response["commentId"]})">Delete</button>
									</div>`;
		}
	}

	request.setRequestHeader("X-CSRFToken", token);
	request.setRequestHeader("text", token);

	request.send(JSON.stringify({
		"text": text,
		"question": questionId
	}));
}


function upvoteComment(id) {
	let url = "http://localhost:8000/exame/upvote/" + id;
	let request = new XMLHttpRequest();
	console.log("upvote clicked");
	request.open("GET", url);

	request.onreadystatechange = function() {
		if(this.readyState === 4 && this.status === 200) {
			votes = document.getElementById("votes" + id);
			votes.innerText++;
		} else if (this.readyState === 4 && this.status === 400){
			alert("Já deste upvote neste comentário");
		}
	}

	request.send();
}


function downvoteComment(id) {
	let url = "http://localhost:8000/exame/downvote/" + id;
	let request = new XMLHttpRequest();
	console.log("downvote clicked");
	request.open("GET", url);

	request.onreadystatechange = function() {
		if(this.readyState === 4 && this.status === 200) {
			votes = document.getElementById("votes" + id);
			votes.innerText--;
		} else if (this.readyState === 4 && this.status === 400){
			alert("Já deste downvote neste comentário");
		}
	}

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

