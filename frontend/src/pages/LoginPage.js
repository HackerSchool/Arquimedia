import React, { Component } from "react";
import {
	Grid
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import LoginInput from "../components/login/LoginInput";

const useStyles = makeStyles(theme => ({
	form: {
		marginTop: "80px"
	}
}))

const LoginPage = () => {
	const classes = useStyles();

	return (
		<Grid container align="center" className={classes.form} >
			<Grid item xs={12}>
				<LoginInput />
			</Grid>
		</Grid>
	)
}

export default LoginPage;