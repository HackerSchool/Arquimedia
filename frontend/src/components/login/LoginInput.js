import { Grid, InputBase, Link } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { logIn } from '../../api';
import React, { useState } from 'react';
import NormalButton from '../buttons/NormalButton';
import { ReactComponent as Logo } from '../../assets/logo_white.svg';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
	input: {
		backgroundColor: '#fff',
		borderRadius: 50,
		disableUnderline: true,
		height: 65,
		width: '22rem',
	},
	container: {
		width: '100%',
	},
	containerForm: {
		width: '100%',
		marginTop: '7rem',
	},
	resetPasswordText: {
		color: theme.palette.background.default,
		fontSize: 18,
		'&:hover': {
			color: theme.palette.secondary.main,
		},
	},
}));

const LoginInput = () => {
	const classes = useStyles();

	const [username, setUsername] = useState(null);
	const [password, setPassword] = useState(null);

	const handleChangeUsername = (e) => setUsername(e.target.value);
	const handleChangePassword = (e) => setPassword(e.target.value);

	const { enqueueSnackbar } = useSnackbar();

	const handleClick = () => {
		logIn(username, password, (error) => {
			if (
				error.response.data.non_field_errors !== undefined &&
				error.response.data.non_field_errors[0] ===
					'Unable to log in with provided credentials.'
			)
				enqueueSnackbar('Nome de utilizador e/ou password incorretos', {
					variant: 'error',
				});
		});
	};

	const handleKeyPress = (e) => {
		if (e.keyCode === 13) {
			handleClick();
		}
	};

	return (
		<Grid
			className={classes.container}
			container
			spacing={4}
			direction='column'
			alignContent='center'
		>
			<Grid item>
				<Logo className={classes.logo} />
			</Grid>
			<Grid
				className={classes.containerForm}
				container
				spacing={4}
				direction='column'
				justifyContent='center'
			>
				<form>
					<Grid item>
						<InputBase
							className={classes.input}
							inputProps={{ style: { margin: '0 1rem 0 1rem', fontSize: 26 } }}
							margin='dense'
							variant='outlined'
							placeholder='Nome de utilizador'
							onChange={handleChangeUsername}
							onKeyUp={handleKeyPress}
						/>
					</Grid>
					<Grid item>
						<InputBase
							className={classes.input}
							inputProps={{ style: { margin: '0 1rem 0 1rem', fontSize: 26 } }}
							variant='outlined'
							placeholder='Password'
							type='password'
							onChange={handleChangePassword}
							onKeyUp={handleKeyPress}
						/>
					</Grid>
					<Grid item>
						<Link
							className={classes.resetPasswordText}
							variant='h5'
							href='/password/reset'
						>
							Não sabes a tua Password ?
						</Link>
					</Grid>
				</form>
				<Grid item style={{ marginTop: '2rem' }}>
					<NormalButton fontSize={45} text='Entrar' onClick={handleClick} />
				</Grid>
				<Grid item>
					<Link className={classes.resetPasswordText} variant='h5' href='/password/reset'>
						Ainda não tens conta? Regista-te
					</Link>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default LoginInput;
