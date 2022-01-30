import React from 'react'
import { Grid, makeStyles, Typography } from '@material-ui/core'
import { ReactComponent as Girl } from "../assets/girl_studying.svg"
import { ReactComponent as Emoji } from "../assets/winking_emoji.svg"
import NormalButton from '../components/buttons/NormalButton'

const useStyles = makeStyles(theme => ({
	mainBox: {
		marginTop: "5rem",
	},
	slogan: {
		fontSize: 55,
		textAlign: "center",

	},
	girl: {
		marginLeft: "5rem"
	},
	sloganGrid:{
		[theme.breakpoints.down('sm')]:{
			marginLeft: "-7rem",
		},
		[theme.breakpoints.down('xs')]:{
			marginLeft: "-14rem",
		},
	},
	normalButton:{
		minWidth:300,
	}
}))

const LandingPage = () => {
	const classes = useStyles();

	return (
		<Grid container className={classes.mainBox} xs={12} justifyContent="center" alignItems="center" spacing={8}>
			<Grid item container xs={4} direction="column" align='center' spacing={6} className={classes.sloganGrid}>
				<Grid item >
					<Typography className={classes.slogan}>
						Exames nacionais<br/><i>made easy</i> <Emoji />
					</Typography>
				</Grid>
				<Grid className={classes.normalButton} item>
					<NormalButton text="Inscreve-te" href="/registar"  fontSize={41} />
				</Grid>
			</Grid>
			<Grid item>
				<Girl className={classes.girl}/>
			</Grid>
		</Grid>
	)
}

export default LandingPage
