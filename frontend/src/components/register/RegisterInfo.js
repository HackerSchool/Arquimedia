import React from 'react';
import { Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { ReactComponent as Rising } from '../../assets/growth-curve-cuate.svg';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import responsiveWidth from '../../hooks/responsiveWidth';
import responsiveHeight from '../../hooks/responsiveHeight';

const useStyles = makeStyles(() => ({
	svg: {
		position: 'relative',
		bottom: -5,
	},
	text: {
		fontWeight: 'bold',
		textAlign: 'start',
		marginLeft: '3rem',
		marginTop: '12rem',
	},
}));

const RegisterInfo = () => {
	const classes = useStyles();
	const windowArray = useWindowDimensions();

	return (
		<Grid
			container
			xs={7}
			direction='column'
			justifyContent='space-between'
			alignItems='flex-start'
			style={{ height: windowArray.height }}
		>
			<Grid item>
				<Typography
					variant='h1'
					className={classes.text}
					fontSize={responsiveWidth(windowArray, 5, 50, 0.03)}
				>
					Preparado para
					<br />
					<span style={{ textDecoration: 'underline' }}>subir notas?</span>
				</Typography>
			</Grid>
			<Grid item xs={6}>
				{' '}
				<Rising
					className={classes.svg}
					style={{
						width: responsiveWidth(windowArray, undefined, undefined, 0.3),
						height: responsiveHeight(windowArray, undefined, undefined, 0.496),
					}}
				/>
			</Grid>
		</Grid>
	);
};

export default RegisterInfo;
