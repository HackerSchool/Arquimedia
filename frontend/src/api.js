// API Calls should be made here
const axios = require('axios').default;

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.headers.common["Authorization"] = localStorage.getItem("Authorization");


// Fetch current User
export async function getUser(successCall, errorCall) {
	if (isAuthenticated()) {
		axios.get("/api/current_user").then(res => {
			successCall(res);
		}).catch((error) => errorCall(error))
		return;
	}
	errorCall();
}

// Fetch given user's profile
export async function getProfile(id, successCall) {
	axios.get("api/profile/" + id)
	.then((res) => successCall(res))
	.catch((error) => {
		// If something went wrong in fetching the user maybe we should clean the current token
		localStorage.removeItem("Authorization");
		console.log(error);
	});
}

export function isAuthenticated() {
	return localStorage.getItem("Authorization") != null;
}

// Log in User
export async function logIn(username, password, errorCall) {
	// TODO: add successCall and errorCall
	axios.post("/rest-auth/login/", {
		username: username, 
		password: password
	}).then(res => {
		console.log(res.data);
		localStorage.setItem("Authorization", "Token " + res.data.key);
		window.location.replace("/");
	}).catch((error) => {
		localStorage.removeItem("Authorization");
		errorCall();
	})
}


// Log out User
export async function logOut() {
	axios.post("/rest-auth/logout/").then(localStorage.removeItem("Authorization"));
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
	axios.post("api/upvote/" + id)
	.then((res) => successCall(res));
}


export async function downvoteAPI(id, successCall) {
	axios.post("api/downvote/" + id)
	.then((res) => successCall(res));
}


export async function deleteCommentAPI(id, successCall) {
	axios.delete("api/comment/" + id)
	.then((res) => successCall(res))
}


export async function removeUpvoteAPI(id, successCall) {
	axios.delete("api/upvote/" + id)
	.then((res) => successCall(res))
}


export async function removeDownvoteAPI(id, successCall) {
	axios.delete("api/downvote/" + id)
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


export async function registerUser(body, successCall, errorCall) {
	axios.post("/rest-auth/registration/", body)
	.then((res) => successCall(res))
	.catch((error) => errorCall(error));
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


export async function getSubjectInfo(Name, successCall) {
	axios.get("api/subject/" + Name)
	.then((res) => successCall(res));
}


export async function followUser(ID, successCall) {
	axios.get("api/follow/" + ID)
	.then((res) => successCall(res));
}


export async function unfollowUser(ID, successCall) {
	axios.delete("api/follow/" + ID)
	.then((res) => successCall(res));
}


export async function getAllAchievements(successCall) {
	axios.get("api/achievements")
	.then((res) => successCall(res));
}


export async function fetchLeaderboard(span, page, successCall) {
	axios.get("api/leaderboard/" + span + "/" + page)
	.then((res) => successCall(res));
}

/** Calls for a password reset
 * 
 * example of body: {
 * 						email: "johndoe@gmail.com"
 * 					}
 * 
 */
export async function requestPasswordReset(body, successCall, errorCall) {
	axios.post("rest-auth/password/reset/", body)
	.then((res) => successCall(res))
	.catch((error) => errorCall(error));
}

/** Confirms a password reset
 *  body example: 
 * {
 *    newPassword1: "MiguelVotaCHEGA",
 * 	  newPassword2: "MiguelVotaCHEGA",
 * 	  uid: "MQ"
 *    token: "QWJBEQWUYBfqunu22412"	
 * }
 * 
 */
export async function confirmPasswordReset(uid, token, body, successCall, errorCall) {
	axios.post("rest-auth/password/reset/confirm/" + uid + "/" + token + "/", body)
	.then((res) => successCall(res))
	.catch((error) => errorCall(error));
}

export async function confirmEmail(code, username, successCall, errorCall) {
	axios.get("api/email-confirm/" + username + "/" + code)
	.then((res) => successCall(res))
	.catch((error) => errorCall(error));
}
