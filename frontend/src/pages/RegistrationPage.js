import React from "react";
import {
	Grid,
	Paper
} from "@material-ui/core";
import RegisterInput from "../components/register/RegisterInput";
import RegisterInfo from "../components/register/RegisterInfo";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	form: {
		width: "50%",
		backgroundColor: "yellow",
		color: "black",
		borderRadius: "50px",
	},
	inputs: {
		borderTopColor: "white"
	}
}))

const RegistrationPage = () => {
	const classes = useStyles();

	return (
		<Grid container direction="row" align="center">
			<Grid item xs={6}>
				<RegisterInfo />
			</Grid>
			<Grid item xs={6}>
				<Paper className={classes.form}>
					<RegisterInput css={classes.inputs}/>
				</Paper>
			</Grid>
		</Grid>
	)
}

export default RegistrationPage;