import React from 'react';
import { Grid } from '@mui/material';
import RegisterInput from '../components/register/RegisterInput';
import RegisterInfo from '../components/register/RegisterInfo';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(() => ({
	container: {
		height: '100vh',
		border: 3,
		boxSizing: 'border-box',
	},
	form: {
		backgroundColor: '#56CCF2',
	},
}));

const RegistrationPage = () => {
	const classes = useStyles();

	return (
		<Grid
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
				<RegisterInfo />
			</Grid>
			<Grid className={classes.form} item xs={5}>
				<RegisterInput />
			</Grid>
		</Grid>
	);
};

export default RegistrationPage;
