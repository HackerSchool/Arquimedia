import React from "react";
import {
	Grid,
} from "@material-ui/core";
import RegisterInput from "../components/register/RegisterInput";
import RegisterInfo from "../components/register/RegisterInfo";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	container: {
		height: "100vh",
		border: 3,
		boxSizing: "border-box"
	},
	form: {
		backgroundColor: "#56CCF2",
	}
}))

const RegistrationPage = () => {
	const classes = useStyles();

	return (
		<Grid className={classes.container} container direction="row" align="center">
			<Grid item xs={7}>
				<RegisterInfo />
			</Grid>
			<Grid className={classes.form} item xs={5}>
					<RegisterInput />
			</Grid>
		</Grid>
	)
}

export default RegistrationPage;