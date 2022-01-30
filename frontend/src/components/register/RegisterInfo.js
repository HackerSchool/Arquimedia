import React from "react";
import {
	Grid,
	Typography,
	makeStyles
} from "@material-ui/core";
import { ReactComponent as Rising } from "../../assets/growth-curve-cuate.svg"

const useStyles = makeStyles(theme => ({
	svg: {
		bottom: 0,
		marginBottom: "2rem",
		left: 0,
		marginLeft: "6rem",
		[theme.breakpoints.down('md')]:
		{
			height: 500,
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
			display: "none",
		},


		textAlign: 'start',
		marginLeft: '6rem',
		marginTop: '12rem',
	}
}))

const RegisterInfo = () => {
	const classes = useStyles();
	
	return (
		<div>
			<Typography variant="h1" className={classes.text}>Preparado para<br /><span style={{textDecoration: 'underline'}}>subir notas?</span></Typography>
			<Rising  className={classes.svg}/>
		</div>
	)
}

export default RegisterInfo;