import React from 'react';
import { Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { ReactComponent as Rising } from '../../assets/growth-curve-cuate.svg';

const useStyles = makeStyles(() => ({
	svg: {
		position: 'relative',
		bottom: -5,
	},
	text: {
		fontWeight: 'bold',
		fontSize: 50,
		textAlign: 'start',
		marginLeft: '6rem',
		marginTop: '12rem',
	},
}));

const RegisterInfo = () => {
	const classes = useStyles();

	return (
		<>
			<Grid>
				<Typography variant='h1' className={classes.text}>
					Preparado para
					<br />
					<span style={{ textDecoration: 'underline' }}>subir notas?</span>
				</Typography>
			</Grid>
			<Grid>
				{' '}
				<Rising className={classes.svg} />
			</Grid>
		</>
	);
};

export default RegisterInfo;
