import React, { useEffect, useState, useRef } from "react";
import {
	Grid, Typography,
} from "@material-ui/core";
import { makeStyles, InputBase } from "@material-ui/core";
import { confirmEmail, logIn } from "../../api";

const useStyles = makeStyles(theme => ({
	container: {
		width: "100%",
		height: "100%"
	},
	form: {
		backgroundColor: "#56CCF2",
	},
	input: {
		backgroundColor: "#fff",
		borderRadius: 50,
		disableUnderline: true,
		height: 120,
		width: "20rem",
	},
	text: {
		color: "#fff",
		fontWeight: 'medium',
		paddingBottom: "7rem"
	},
	error: {
		color: "#EB5757",
		fontWeight: 'bold',
		backgroundColor: '#fff',
		width: "10rem",
		borderRadius: 20
	}
}))

const CodeInput = (props) => {
	const classes = useStyles();
	const [code, setCode] = useState("");
	const [wrongCode, setWrongCode] = useState(false);
	const mountedRef = useRef()

	useEffect(() => {
		if (mountedRef.current) {
			mountedRef.current = false
		} else {
			if (code.length === 6) {
				// request the data base
				console.log("Hello");
				confirmEmail(code, props.username, () => {
					setTimeout(() => {
						// code is okay, log user
						logIn(props.username, props.password)
					}, 50)
				}, () => {
					// wrong code?
					setTimeout(() => {
						setWrongCode(true)
					}, 50)
				})
			}
		}
	}, [code, props.history, props.password, props.username])

	return (
		<Grid className={classes.container} container spacing={4} direction="column" justify='center'>
			<Grid item>
				<Typography className={classes.text}  variant="h2">Digita o código que acabamos de enviar para o teu e-mail.</Typography>
			</Grid>
			
			<Grid item>
				<InputBase 
					className={classes.input} 
					inputProps={{ style: { margin: "0 1rem 0 1rem", fontSize: 60, letterSpacing: 14 }, maxLength: 6 }} 
					margin="dense" 
					variant="outlined" 
					placeholder="Código" 
					onChange={(e) => setCode(e.target.value)}
				/>
			</Grid>
			<Grid item>
			{wrongCode && (
					<Typography className={classes.error} variant="h6">Código errado!</Typography>
				)}
			</Grid>
		</Grid>
	)
}

export default CodeInput;