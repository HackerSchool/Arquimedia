import React from "react";
import {
	Grid,
	useTheme,
	useMediaQuery,
} from "@material-ui/core";
import RegisterInput from "../components/register/RegisterInput";
import RegisterInfo from "../components/register/RegisterInfo";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	container: {
		height: "100vh",

		border: 3,
		boxSizing: "border-box",

	},
	form: {
		backgroundColor: theme.palette.primary.main,
		opacity:0.8,
        height: '100vh'

	},
}))

const RegistrationPage = () => {
	const classes = useStyles();
	const theme = useTheme();
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<div  >
			{(isSmallScreen) ? 
			(<Grid className={classes.form} classes={classes.container} container direction="row" justifyContent="flex-start" alignItems="center">
				<Grid item xs={3}>
					<RegisterInfo />
				</Grid>
				<Grid  item xs={9}>
					<RegisterInput />
				</Grid>
			</Grid>

			)
				: 
			(
			<Grid className={classes.container} container direction="row" align="center">
				<Grid item xs={7}>
					<RegisterInfo />
				</Grid>
				<Grid className={classes.form} item xs={5}>
					<RegisterInput />
				</Grid>
			</Grid>)}

		</div>
	)
}

export default RegistrationPage;