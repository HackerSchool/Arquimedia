import {
	Grid,
	makeStyles,
	InputBase,
} from "@material-ui/core";
import { logIn } from "../../api";
import React, { useState } from 'react';
import NormalButton from "../buttons/NormalButton";
import { ReactComponent as Logo } from "../../assets/logo_white.svg"
import AlertSnackBar from "../alerts/AlertSnackBar";

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
		marginTop: "7rem"
	}
}))

const LoginInput = () => {
	const classes = useStyles()

	const [username, setUsername] = useState(null);
	const [password, setPassword] = useState(null);
	const [error, setError] = useState(false);

	const handleChangeUsername = (e) => setUsername(e.target.value);
	const handleChangePassword = (e) => setPassword(e.target.value);
	
	const handleClick = () => {
		logIn(username, password, (error) => {
			setError(true);
		});
	}

	const handleKeyPress = (e) => {
		console.log(e.keyCode)
		if (e.keyCode === 13) {
			handleClick();
		}
	}

	return (
		<Grid className={classes.container} container spacing={4} direction="column" alignContent="center">
			<Grid item>
				<Logo className={classes.logo} />
			</Grid>
			<Grid className={classes.containerForm} container spacing={4} direction="column" justify='center'>
				<Grid item>
					<InputBase 
						className={classes.input} 
						inputProps={{ style: { margin: "0 1rem 0 1rem", fontSize: 26 } }} 
						margin="dense" 
						variant="outlined" 
						placeholder="Nome de utilizador" 
						onChange={handleChangeUsername}
						onKeyUp={handleKeyPress}
					/>
				</Grid>
				<Grid item>
					<InputBase 
						className={classes.input} 
						inputProps={{ style: { margin: "0 1rem 0 1rem", fontSize: 26 }}} 
						variant="outlined" 
						placeholder="Password" 
						type="password" 
						onChange={handleChangePassword}
						onKeyUp={handleKeyPress}
					/>
				</Grid>
					<AlertSnackBar anchorOrigin={{ vertical:"bottom", horizontal:"right" }} open={error} text="Nome de utilizador e/ou password incorretos" type="error"/>
				<Grid item style={{marginTop: "4rem"}}>
					<NormalButton fontSize={45} text="Entrar" onClick={handleClick}/>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default LoginInput;