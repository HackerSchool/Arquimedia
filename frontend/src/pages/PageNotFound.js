import React from 'react';
import NormalButton from '../components/buttons/NormalButton';
import { Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { ReactComponent as Svg1 } from '../assets/404(1).svg';
import { ReactComponent as Svg2 } from '../assets/404(2).svg';
import { ReactComponent as Svg3 } from '../assets/404(3).svg';

const useStyles = makeStyles(() => ({
	svg: {
		width: 650,
		marginBottom: '3rem',
	},
}));

const SVGS = [Svg1, Svg2, Svg3];

const PageNotFound = () => {
	const classes = useStyles();

	// pick a random svg
	const RandomSVG = SVGS[Math.floor(Math.random() * SVGS.length)];

	const handleClick = () => {
		window.history.back();
	};

	return (
		<Grid container className={classes.container} justifyContent='center' align='center'>
			<Grid item xs={12}>
				<RandomSVG className={classes.svg} />
			</Grid>
			<Grid item>
				<NormalButton
					onClick={handleClick}
					className={classes.button}
					text='Voltar atrás'
					fontSize={50}
					scale={1.015}
				/>
			</Grid>
		</Grid>
	);
};

export default PageNotFound;
