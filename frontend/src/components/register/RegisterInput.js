import {
	Grid,
	TextField,
	Button,
	Typography,
} from "@material-ui/core"
import { useState } from "react"
import { registerUser } from "../../api";

const RegisterInput = ({css}) => {
	const [username, setUsername] = useState();
	const [email, setEmail] = useState();
	const [pass1, setPass1] = useState();
	const [pass2, setPass2] = useState();

	const handleChangeUsername = (e) => setUsername(e.target.value);
	const handleChangeEmail = (e) => setEmail(e.target.value);
	const handleChangePass1 = (e) => setPass1(e.target.value);
	const handleChangePass2 = (e) => setPass2(e.target.value);

	const handleClick = () => {
		if (pass1 !== pass2) alert("Passwords são diferents!");
		else if (username === "" || email === "" || pass1 === "" || pass2 === "") alert("Digitalize os dados");
		else {
			const body = {
				username: username,
				email: email,
				password1: pass1,
				password2: pass2
			}

			registerUser(body);
		}
	}

	return (
		<Grid container spacing={4} xs={12}>
			<Grid item xs={12}>
				<Typography variant="h3">Regista-te</Typography>
			</Grid>
			<Grid item xs={12}>
				<TextField className={css} variant="outlined" label="Username" onChange={handleChangeUsername}/>
			</Grid>
			<Grid item xs={12}>
				<TextField className={css} variant="outlined" label="E-mail" onChange={handleChangeEmail}/>
			</Grid>
			<Grid item xs={12}>
				<TextField className={css} variant="outlined" label="Password" type="password" onChange={handleChangePass1}/>
			</Grid>
			<Grid item xs={12}>
				<TextField className={css} variant="outlined" label="Repete a password" type="password" onChange={handleChangePass2}/>
			</Grid>
			<Grid item xs={12}>
				<Button className={css} variant="contained" type="submit" onClick={handleClick}>Registar</Button>
			</Grid>
		</Grid>
	)
}

export default RegisterInput;