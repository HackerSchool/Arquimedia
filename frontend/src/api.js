// API Calls should be made here
const axios = require('axios').default;


export async function getUser() {
	const response = await axios.get("/api/current_user")
	return response.data;
}

