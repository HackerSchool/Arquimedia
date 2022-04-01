import React from "react";
import {
	Grid,
	Typography
} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import LoginInput from "../components/login/LoginInput";
import { ReactComponent as Girl } from "../assets/girl_laid.svg"

const useStyles = makeStyles(theme => ({
	container: {
		height: "100vh",
		border: 3,
		boxSizing: "border-box"
	},
	form: {
		backgroundColor: "#56CCF2",
	},
	svg: {
		position: 'absolute',
		bottom: 0,
		marginBottom: "2rem",
		left: 0,
		marginLeft: "6rem"
	},
	text: {
		fontWeight: 'bold',
		fontSize: 50,
		textAlign: 'start',
		marginLeft: '6rem',
		marginTop: '12rem',
	}
}))

const LoginPage = () => {
	const classes = useStyles();

	return (
		<Grid className={classes.container} container direction="row" align="center">
			<Grid item xs={7}>
				<Typography variant="h1" className={classes.text}>Um exame por dia<br />não sabes o <span style={{textDecoration: 'underline'}}>bem</span> que te fazia!</Typography>
				<Girl  className={classes.svg}/>
			</Grid>
			<Grid className={classes.form} item xs={5}>
				<LoginInput />
			</Grid>
		</Grid>
	)
}

export default LoginPage;