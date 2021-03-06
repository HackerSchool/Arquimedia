import React, { useContext } from 'react';
import { Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { ReactComponent as Girl } from '../assets/girl_studying.svg';
import { ReactComponent as Emoji } from '../assets/winking_emoji.svg';
import NormalButton from '../components/buttons/NormalButton';
import { userContext } from '../context/UserContextProvider';
import { HomePage } from './HomePage';

const useStyles = makeStyles(() => ({
	mainBox: {
		marginTop: '5vh',
	},
	slogan: {
		fontSize: 55,
		textAlign: 'center',
	},
	girl: {
		marginLeft: '5rem',
	},
}));

const LandingPage = () => {
	const classes = useStyles();
	const [user, loading] = useContext(userContext);

	if (!loading && user !== null) {
		return <HomePage />;
	}

	return (
		!loading && (
			<Grid
				container
				className={classes.mainBox}
				xs={12}
				justifyContent='center'
				alignItems='center'
				spacing={8}
			>
				<Grid item container xs={4} direction='column' align='center' spacing={6}>
					<Grid item>
						<Typography className={classes.slogan}>
							Exames nacionais
							<br />
							<i>made easy</i> <Emoji />
						</Typography>
					</Grid>
					<Grid xs={6} item style={{ minWidth: '19rem' }}>
						<NormalButton text='Inscreve-te' href='/registar' fontSize={41} />
					</Grid>
				</Grid>
				<Grid item>
					<Girl className={classes.girl} />
				</Grid>
			</Grid>
		)
	);
};

export default LandingPage;
