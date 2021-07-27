import { Email, LocalSeeOutlined } from '@material-ui/icons';

// API Calls should be made here
const axios = require('axios').default;

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.headers.common["Authorization"] = localStorage.getItem("Authorization");


// Fetch current User
export async function getUser(successCall, errorCall) {
	axios.get("/api/current_user").then(res => {
		successCall(res);
	}).catch(() => errorCall())
}

// Log in User
export async function logIn(username, password) {
	axios.post("/rest-auth/login/", {
		username: username, 
		password: password
	}).then(res => {
		console.log(res.data);
		localStorage.setItem("Authorization", "Token " + res.data.key);
		return res
	})
}


// Log out User
export async function logOut() {
	axios.post("/rest-auth/logout/").then(localStorage.setItem("Authorization", null));
}
