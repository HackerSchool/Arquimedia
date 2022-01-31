import React from "react";
import {
	Grid,
	Typography,
	useTheme,
	useMediaQuery,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import LoginInput from "../components/login/LoginInput";
import { ReactComponent as Girl } from "../assets/girl_laid.svg"

const useStyles = makeStyles(theme => ({
	container: {
		height: "100vh",
		border: 3,
		boxSizing: "border-box"
	},
	form: {
		backgroundColor: theme.palette.primary.main,
		opacity:0.8,
		width: '100vw',
        height: '100vh'

	},
	svg: {
		bottom: 0,
		marginBottom: "2rem",
		left: 0,
		marginLeft: "6rem",
		[theme.breakpoints.down('md')]:
		{
			height: 250,
		},
		[theme.breakpoints.down(820)]:
		{
			marginBottom: "-4rem",
			marginLeft: "-2rem",
		},
		
	},
	text: {
		fontWeight: 'bold',
		fontSize: 50,
		[theme.breakpoints.between('sm', 'md')]:
		{
			fontSize: 35,
		},
		[theme.breakpoints.down('sm')]:
		{
			fontSize: 25,
		},
		[theme.breakpoints.down(900)]:
		{
			display: 'none',
		},

		textAlign: 'start',
		marginLeft: '6rem',
		marginTop: '12rem',
	}
}))
	

const LoginPage = () => {

	const classes = useStyles();
	const theme = useTheme();
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<div >
			{(isSmallScreen) ? 
			(

			<Grid className={classes.form} classes={classes.container} container direction="row" justifyContent="flex-start" alignItems="center"
			>
				<Grid item xs={4}>
					<Typography variant="h1" className={classes.text}>Um exame por dia<br />não sabes o <span style={{textDecoration: 'underline'}}>bem</span> que te fazia!</Typography>
					<Girl  className={classes.svg}/>
				</Grid>
				<Grid item xs={5}>
					<LoginInput />
				</Grid>
			</Grid>

			)
				: 
			(
			<Grid className={classes.container} container direction="row" align="center">
				<Grid item xs={7}>
					<Typography variant="h1" className={classes.text}>Um exame por dia<br />não sabes o <span style={{textDecoration: 'underline'}}>bem</span> que te fazia!</Typography>
					<Girl  className={classes.svg}/>
				</Grid>
				<Grid className={classes.form} item xs={5}>
					<LoginInput />
				</Grid>
			</Grid>)}

		</div>


	)
}

export default LoginPage;