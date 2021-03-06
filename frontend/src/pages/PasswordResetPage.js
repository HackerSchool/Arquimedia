import React, { useState } from 'react';
import { Grid, Typography, TextField, Button, Collapse, IconButton } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { requestPasswordReset } from '../api';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles(() => ({
	mainBox: {
		marginTop: '5rem',
		textAlign: 'center',
	},
	formItems: {
		paddingBottom: '1em',
	},
}));

const PasswordResetPage = () => {
	const classes = useStyles();
	const [email, setEmail] = useState('');
	const [alert, setAlert] = useState(false);
	const [checkEmail, setCheckEmail] = useState(false);

	const requestReset = () => {
		requestPasswordReset(
			{ email: email },
			() => {
				// send user check his email account
				setCheckEmail(true);
			},
			(error) => {
				// check the error
				console.log(error);
				setAlert(true);
			}
		);
	};

	return checkEmail ? (
		<Typography className={classes.mainBox} variant='h2'>
			Vai ao teu e-mail
		</Typography>
	) : (
		<Grid
			container
			className={classes.mainBox}
			justifyContent='center'
			alignItems='center'
			direction='column'
		>
			<Typography className={classes.formItems} variant='h2'>
				Reset de Password
			</Typography>
			<TextField
				className={classes.formItems}
				variant='outlined'
				label='E-mail'
				onChange={(e) => setEmail(e.target.value)}
			/>
			<Button className={classes.formItems} onClick={requestReset}>
				Pedir reset
			</Button>
			{alert && (
				<Collapse className={classes.formItems} in={alert}>
					<Alert
						severity='error'
						action={
							<IconButton
								aria-label='close'
								color='inherit'
								size='small'
								onClick={() => {
									setAlert(false);
								}}
							>
								<CloseIcon fontSize='inherit' />
							</IconButton>
						}
					>
						E-mail inválido — <strong>Verifica novamente!</strong>
					</Alert>
				</Collapse>
			)}
		</Grid>
	);
};

export default PasswordResetPage;
