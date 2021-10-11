// API Calls should be made here
const axios = require('axios').default;

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.headers.common["Authorization"] = localStorage.getItem("Authorization");


// Fetch current User
export async function getUser(successCall, errorCall) {
	axios.get("/api/current_user").then(res => {
		successCall(res);
	}).catch((error) => errorCall(error))
}

// Log in User
export async function logIn(username, password) {
	axios.post("/rest-auth/login/", {
		username: username, 
		password: password
	}).then(res => {
		console.log(res.data);
		localStorage.setItem("Authorization", "Token " + res.data.key);
		window.location.replace("/");
	}).catch((error) => {
		console.log(error);
		alert("Utilizador ou Password errada!");
	})
}


// Log out User
export async function logOut() {
	axios.post("/rest-auth/logout/").then(localStorage.setItem("Authorization", null));
}


export async function questionInfo(id, successCall) {
	axios.get("api/question/" + id)
	.then((res) => successCall(res))
	.catch((error) => console.log(error));
}


export async function hasDownvotedAPI(id, successCall) {
	axios.get("api/has_downvoted/" + id)
	.then((res) => successCall(res))
}


export async function hasUpvotedAPI(id, successCall) {
	axios.get("api/has_upvoted/" + id)
	.then((res) => successCall(res))
}


export async function upvoteAPI(id, successCall) {
	axios.post("api/upvote_comment/" + id)
	.then((res) => successCall(res));
}


export async function downvoteAPI(id, successCall) {
	axios.post("api/downvote_comment/" + id)
	.then((res) => successCall(res));
}


export async function deleteCommentAPI(id, successCall) {
	axios.delete("api/comment/" + id)
	.then((res) => successCall(res))
}


export async function removeUpvoteAPI(id, successCall) {
	axios.post("api/remove_upvote/" + id)
	.then((res) => successCall(res))
}


export async function removeDownvoteAPI(id, successCall) {
	axios.post("api/remove_downvote/" + id)
	.then((res) => successCall(res))
}


export async function createCommentAPI(body, successCall) {
	axios.post("api/comment/", body)
	.then((res) => successCall(res))
}


export async function createExam(body, successCall) {
	axios.post("api/exam/", body)
	.then((res) => successCall(res))
}


export async function examInfo(id, successCall) {
	axios.get("api/exam/" + id)
	.then((res) => successCall(res));
}


export async function submitExam(id, body, successCall) {
	axios.put("api/exam/" + id, body)
	.then((res) => successCall(res));
}


export async function registerUser(body) {
	axios.post("/rest-auth/registration/", body)
	.then((res) => {
		localStorage.setItem("Authorization", "Token " + res.data.key);
		window.location.replace("/");
	});
}


export async function submitQuestion(body, successCall) {
	axios.post("api/question/", body)
	.then((res) => successCall(res));
}


export async function submitQuestionImage(body, id, successCall) {
	const headers = {
		headers: {
			"Content-Type": "multipart/form-data"
		}
	}
	axios.post("api/add_image/" + id, body, headers)
	.then((res) => successCall(res));
}


export async function getSubmittedQuestions(successCall) {
	axios.get("api/submitted_questions")
	.then((res) => successCall(res));
}


export async function deleteQuestion(ID, successCall) {
	axios.delete("api/question/" + ID)
	.then((res) => successCall(res));
}


export async function acceptQuestion(ID, successCall) {
	axios.put("api/question/" + ID)
	.then((res) => successCall(res));
}


export async function getXpEvents(ID, successCall) {
	axios.get("api/xpevents/" + ID)
	.then((res) => successCall(res));
}