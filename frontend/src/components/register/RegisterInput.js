import React from 'react';
import { Grid, InputBase } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useState } from 'react';
import { registerUser } from '../../api';
import { ReactComponent as Logo } from '../../assets/logo_white.svg';
import NormalButton from '../buttons/NormalButton';
import CodeInput from './CodeInput';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(() => ({
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
		marginTop: '5rem',
	},
}));

const RegisterInput = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [pass1, setPass1] = useState('');
	const [pass2, setPass2] = useState('');
	const [codePhase, setcodePhase] = useState(false);

	const classes = useStyles();

	const handleChangeUsername = (e) => setUsername(e.target.value);
	const handleChangeEmail = (e) => setEmail(e.target.value);
	const handleChangePass1 = (e) => setPass1(e.target.value);
	const handleChangePass2 = (e) => setPass2(e.target.value);

	const validUsername = new RegExp('^[a-zA-Z0-9._+-@]+$');
	const validEmail = new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[a-zA-Z0-9-.]+$');
	const { enqueueSnackbar } = useSnackbar();

	const handleClick = () => {
		if (username === '' || email === '' || pass1 === '' || pass2 === '')
			enqueueSnackbar('Por favor, preencha todos os campos antes de submeter.', {
				variant: 'warning',
			});
		else if (!validEmail.test(email))
			enqueueSnackbar('Insira um endereço de email válido.', { variant: 'warning' });
		else if (!validUsername.test(username))
			enqueueSnackbar(
				'Insira um username válido. Este só pode conter letras, números ou os caracteres @ / . / + / - / _',
				{ variant: 'warning' }
			);
		else if (pass1 !== pass2)
			enqueueSnackbar('As passwords inseridas são diferentes.', { variant: 'warning' });
		else {
			const body = {
				username: username,
				email: email,
				password1: pass1,
				password2: pass2,
			};

			registerUser(
				body,
				() => {
					setcodePhase(true);
				},
				(error) => {
					if (
						error.response.data.username !== undefined &&
						error.response.data.username[0] ===
							'A user with that username already exists.'
					)
						enqueueSnackbar(
							'Já existe uma conta com este nome de utilizador. Tente inserir outros dados ou se já tiver conta, faça login.',
							{ variant: 'warning' }
						);
					else if (
						error.response.data.email !== undefined &&
						error.response.data.email[0] ===
							'A user is already registered with this e-mail address.'
					)
						enqueueSnackbar(
							'Já existe uma conta com este endereço de email. Tente inserir outros dados ou se já tiver conta, faça login.',
							{ variant: 'warning' }
						);
					else if (
						error.response.data.password1 !== undefined &&
						error.response.data.password1[0] ===
							'This password is too short. It must contain at least 8 characters.'
					)
						enqueueSnackbar(
							'A sua palavra-passe é demasiado curta (pelo menos 8 caracteres).',
							{ variant: 'warning' }
						);
					else if (
						error.response.data.password1 !== undefined &&
						error.response.data.password1[0] === 'This password is too common.'
					)
						enqueueSnackbar('A sua palavra-passe é demasiado comum.', {
							variant: 'warning',
						});
				}
			);
		}
	};

	if (codePhase) return <CodeInput username={username} password={pass1} />;

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
			<Grid className={classes.containerForm} container spacing={4} direction='column'>
				<form>
					<Grid item>
						<InputBase
							className={classes.input}
							inputProps={{ style: { margin: '0 1rem 0 1rem', fontSize: 26 } }}
							margin='dense'
							variant='outlined'
							placeholder='Nome de utilizador'
							autoComplete='true'
							onChange={handleChangeUsername}
						/>
					</Grid>
					<br />
					<Grid item>
						<InputBase
							className={classes.input}
							inputProps={{ style: { margin: '0 1rem 0 1rem', fontSize: 26 } }}
							variant='outlined'
							placeholder='E-mail'
							autoComplete='true'
							onChange={handleChangeEmail}
						/>
					</Grid>
					<br />
					<Grid item>
						<InputBase
							className={classes.input}
							inputProps={{ style: { margin: '0 1rem 0 1rem', fontSize: 26 } }}
							variant='outlined'
							placeholder='Password'
							type='password'
							autoComplete='true'
							onChange={handleChangePass1}
						/>
					</Grid>
					<br />
					<Grid item>
						<InputBase
							className={classes.input}
							inputProps={{ style: { margin: '0 1rem 0 1rem', fontSize: 26 } }}
							variant='outlined'
							placeholder='Repete a password'
							type='password'
							autoComplete='true'
							onChange={handleChangePass2}
						/>
					</Grid>
				</form>
				<Grid item style={{ marginTop: '4rem' }}>
					<NormalButton fontSize={45} text='Registar' onClick={handleClick} />
				</Grid>
			</Grid>
		</Grid>
	);
};

export default RegisterInput;
