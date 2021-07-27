import {
	TextField,
	Grid,
	Button
} from "@material-ui/core";
import { logIn } from "../../api";
import React, { useState } from 'react';



const LoginInput = () => {
	const [username, setUsername] = useState(null);
	const [password, setPassword] = useState(null);

	const handleChangeUsername = (e) => setUsername(e.target.value);
	const handleChangePassword = (e) => setPassword(e.target.value);
	
	const handleClick = () => {
		const res = logIn(username, password)
	}

	return (
		<Grid container spacing={3}>
			<Grid item xs={12}>
				<TextField variant="outlined" label="Username" onChange={handleChangeUsername}/>
			</Grid>
			<Grid item xs={12}>
				<TextField variant="outlined" label="Password" type="password" onChange={handleChangePassword}/>
			</Grid>
			<Grid item xs={12}>
				<Button variant="contained" type="submit" onClick={handleClick}>Login</Button>
			</Grid>
		</Grid>
	)
}

export default LoginInput;