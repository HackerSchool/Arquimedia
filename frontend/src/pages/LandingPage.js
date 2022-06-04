import React, { useContext } from 'react';
import { Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { ReactComponent as Girl } from '../assets/girl_studying.svg';
import { ReactComponent as Emoji } from '../assets/winking_emoji.svg';
import NormalButton from '../components/buttons/NormalButton';
import { userContext } from '../context/UserContextProvider';
import { HomePage } from './HomePage';
import useWindowDimensions from '../hooks/useWindowDimensions';
import responsiveWidth from '../hooks/responsiveWidth';
import responsiveHeight from '../hooks/responsiveHeight';

const useStyles = makeStyles(() => ({
	slogan: {
		textAlign: 'center',
	},
	girl: {
		marginLeft: '5rem',
	},
}));

const LandingPage = () => {
	const classes = useStyles();
	const [user, loading] = useContext(userContext);
	const windowArray = useWindowDimensions();

	if (!loading && user !== null) {
		return <HomePage />;
	}

	return (
		!loading && (
			<Grid
				style={{
					height: windowArray.height,
					marginTop: -responsiveHeight(windowArray, undefined, undefined, 0.1),
				}}
				container
				xs={12}
				justifyContent='center'
				alignItems='center'
				spacing={4}
			>
				<Grid
					item
					container
					direction='column'
					justifyContent='center'
					alignItems='center'
					spacing={6}
					style={{ minWidth: '20rem' }}
					xs={6}
				>
					<Grid item>
						<Typography
							style={{ fontSize: responsiveWidth(windowArray, 10, 70, 0.05) }}
							className={classes.slogan}
						>
							Exames nacionais
							<br />
							<i>made easy</i>{' '}
							<Emoji style={{ width: responsiveWidth(windowArray, 10, 70, 0.05) }} />
						</Typography>
					</Grid>
					<Grid xs={6} item>
						<NormalButton
							text='Inscreve-te'
							href='/registar'
							fontSize={responsiveWidth(windowArray, 10, 50, 0.04)}
						/>
					</Grid>
				</Grid>
				<Grid container xs={6}>
					<Girl
						style={{
							maxHeight: windowArray.height - 100,
							width: responsiveWidth(windowArray, 250, undefined, 0.3),
						}}
						className={classes.girl}
					/>
				</Grid>
			</Grid>
		)
	);
};

export default LandingPage;
