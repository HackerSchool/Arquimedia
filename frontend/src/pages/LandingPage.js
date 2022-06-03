import React, { useContext } from 'react';
import { Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { ReactComponent as Girl } from '../assets/girl_studying.svg';
import { ReactComponent as Emoji } from '../assets/winking_emoji.svg';
import NormalButton from '../components/buttons/NormalButton';
import { userContext } from '../context/UserContextProvider';
import { HomePage } from './HomePage';
import useWindowDimensions from '../hooks/useWindowDimensions';

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

	const responsiveFontsize = (windowArray, minFontsize, coef) => {
		let fontsize = coef * windowArray.height;

		if (fontsize > minFontsize) {
			fontsize = minFontsize;
		}

		return fontsize;
	};

	return (
		!loading && (
			<Grid
				container
				className={classes.mainBox}
				xs={12}
				justifyContent='center'
				alignItems='center'
				spacing={4}
				style={{ marginTop: 0.01 * windowArray.height }}
			>
				<Grid item container xs={4} direction='column' align='center' spacing={6}>
					<Grid item>
						<Typography
							style={{ fontSize: responsiveFontsize(windowArray, 55, 0.07) }}
							className={classes.slogan}
						>
							Exames nacionais
							<br />
							<i>made easy</i>{' '}
							<Emoji style={{ width: responsiveFontsize(windowArray, 55, 0.07) }} />
						</Typography>
					</Grid>
					<Grid xs={6} item style={{ minWidth: '19rem' }}>
						<NormalButton
							text='Inscreve-te'
							href='/registar'
							fontSize={responsiveFontsize(windowArray, 41, 0.07)}
						/>
					</Grid>
				</Grid>
				<Grid item>
					<Girl
						style={{ maxHeight: windowArray.height - 100 }}
						className={classes.girl}
					/>
				</Grid>
			</Grid>
		)
	);
};

export default LandingPage;
