import React from 'react';
import { Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import LoginInput from '../components/login/LoginInput';
import { ReactComponent as Girl } from '../assets/girl_laid.svg';
import useWindowDimensions from '../hooks/useWindowDimensions';
import responsiveWidth from '../hooks/responsiveWidth';

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
		textAlign: 'start',
		marginLeft: '3rem',
		marginTop: '12rem',
	},
}));

const LoginPage = () => {
	const classes = useStyles();
	const windowArray = useWindowDimensions();

	return (
		<Grid
			className={classes.container}
			container
			direction='row'
			align='center'
			justifyContent='space-between'
			alignItems='stretch'
		>
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
						className={classes.text}
						fontSize={responsiveWidth(windowArray, 5, 50, 0.03)}
					>
						Um exame por dia,
						<br />
						não sabes o <span style={{ textDecoration: 'underline' }}>bem</span> que te
						fazia!
					</Typography>
				</Grid>
				<Grid item xs={6}>
					{' '}
					<Girl
						className={classes.svg}
						style={{ width: responsiveWidth(windowArray, undefined, undefined, 0.3) }}
					/>
				</Grid>
			</Grid>
			<Grid
				className={classes.form}
				container
				direction='column'
				justifyContent='space-between'
				alignItems='center'
				xs={5}
			>
				<LoginInput />
			</Grid>
		</Grid>
	);
};

export default LoginPage;
