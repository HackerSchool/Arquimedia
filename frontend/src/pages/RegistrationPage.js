import React from 'react';
import { Grid } from '@mui/material';
import RegisterInput from '../components/register/RegisterInput';
import RegisterInfo from '../components/register/RegisterInfo';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(() => ({
	container: {
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
			justifyContent='space-between'
			alignItems='stretch'
		>
			<RegisterInfo />

			<Grid
				className={classes.form}
				container
				direction='column'
				justifyContent='space-between'
				alignItems='center'
				xs={5}
			>
				<RegisterInput />
			</Grid>
		</Grid>
	);
};

export default RegistrationPage;
