import React from 'react';
import { Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import LoginInput from '../components/login/LoginInput';
import { ReactComponent as Girl } from '../assets/girl_laid.svg';
import useWindowDimensions from '../hooks/useWindowDimensions';

const useStyles = makeStyles(() => ({
	container: {
		border: 3,
		boxSizing: 'border-box',
	},
	form: {
		backgroundColor: '#56CCF2',
	},
	svg: {
		marginBottom: '2rem',
		marginLeft: '6rem',
	},
	text: {
		fontWeight: 'bold',
		fontSize: 50,
		textAlign: 'start',
		marginLeft: '6rem',
		marginTop: '12rem',
	},
}));

const LoginPage = () => {
	const classes = useStyles();
	const { height, width } = useWindowDimensions();

	return (
		<Grid
			style={{ width: width, height: height }}
			className={classes.container}
			container
			direction='row'
			align='center'
			alignItems='stretch'
		>
			<Grid
				container
				xs={7}
				direction='column'
				justifyContent='space-between'
				alignItems='flex-start'
			>
				<Grid>
					<Typography variant='h1' className={classes.text}>
						Um exame por dia
						<br />
						não sabes o <span style={{ textDecoration: 'underline' }}>bem</span> que te
						fazia!
					</Typography>
				</Grid>
				<Grid>
					{' '}
					<Girl className={classes.svg} />
				</Grid>
			</Grid>
			<Grid className={classes.form} item xs={5}>
				<LoginInput />
			</Grid>
		</Grid>
	);
};

export default LoginPage;
