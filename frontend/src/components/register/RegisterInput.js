import React from "react";
import {
	Grid,
	TextField,
	Button,
	makeStyles,
	InputBase
} from "@material-ui/core"
import { useState } from "react"
import { registerUser } from "../../api";
import { ReactComponent as Logo } from "../../assets/logo_white.svg"
import NormalButton from "../buttons/NormalButton";
import CodeInput from "./CodeInput";

const useStyles = makeStyles(theme => ({
	input: {
		backgroundColor: "#fff",
		borderRadius: 50,
		disableUnderline: true,
		height: 65,
		width: "22rem",
	},
	container: {
		width: "100%"
	},
	containerForm: {
		width: "100%",
		marginTop: "5rem"
	}
}))

const RegisterInput = (props) => {
	const [username, setUsername] = useState();
	const [email, setEmail] = useState();
	const [pass1, setPass1] = useState();
	const [pass2, setPass2] = useState();
	const [codePhase, setcodePhase] = useState(false);

	const classes = useStyles();

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

			registerUser(body, () => {
				setcodePhase(true);
			}, (error) => {
				console.log("Something went wrong!");
				console.log(error)
			});
		}
	}

	if (codePhase) return <CodeInput username={username} password={pass1}/>

	return (
		<Grid className={classes.container} container spacing={4} direction="column" alignContent="center">
			<Grid item>
				<Logo className={classes.logo} />
			</Grid>
			<Grid className={classes.containerForm} container spacing={4} direction="column">
				<Grid item>
					<InputBase className={classes.input} inputProps={{ style: { margin: "0 1rem 0 1rem", fontSize: 26 } }} margin="dense" variant="outlined" placeholder="Nome de utilizador" onChange={handleChangeUsername}/>
				</Grid>
				<Grid item>
					<InputBase className={classes.input} inputProps={{ style: { margin: "0 1rem 0 1rem", fontSize: 26 } }} variant="outlined" placeholder="E-mail" onChange={handleChangeEmail}/>
				</Grid>
				<Grid item>
					<InputBase className={classes.input} inputProps={{ style: { margin: "0 1rem 0 1rem", fontSize: 26 } }} variant="outlined" placeholder="Password" type="password" onChange={handleChangePass1}/>
				</Grid>
				<Grid item>
					<InputBase className={classes.input} inputProps={{ style: { margin: "0 1rem 0 1rem", fontSize: 26 } }} variant="outlined" placeholder="Repete a password" type="password" onChange={handleChangePass2}/>
				</Grid>
				<Grid item style={{marginTop: "4rem"}}>
					<NormalButton fontSize={45} text="Registar" onClick={handleClick}/>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default RegisterInput;