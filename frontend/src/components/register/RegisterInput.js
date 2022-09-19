import React from 'react';
import { Grid, InputBase, Link } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useState } from 'react';
import { registerUser } from '../../api';
import { ReactComponent as Logo } from '../../assets/logo_white.svg';
import NormalButton from '../buttons/NormalButton';
import CodeInput from './CodeInput';
import { useSnackbar } from 'notistack';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import responsiveWidth from '../../hooks/responsiveWidth';
import responsiveHeight from '../../hooks/responsiveHeight';

const useStyles = makeStyles((theme) => ({
	input: {
		backgroundColor: '#fff',
		borderRadius: 50,
		disableUnderline: true,
	},
	resetPasswordText: {
		color: theme.palette.background.default,
		'&:hover': {
			color: theme.palette.secondary.main,
		},
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
	const windowArray = useWindowDimensions();

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
						(error.response.data.password1[0] ===
							'The password is too similar to the usernames.' ||
							error.response.data.password1[0] ===
								'The password is too similar to the emails.')
					)
						enqueueSnackbar(
							'A sua palavra passe é demasiado parecida com o resto da sua informação pessoal.',
							{ variant: 'warning' }
						);
					else if (
						error.response.data.password1 !== undefined &&
						error.response.data.password1[0] === 'This password is entirely numeric.'
					)
						enqueueSnackbar(
							'A sua palavra passe não pode ser composta unicamente por carateres numéricos.',
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

	const handleKeyPress = (e) => {
		if (e.keyCode === 13) {
			handleClick();
		}
	};

	if (codePhase) return <CodeInput username={username} password={pass1} />;

	return (
		<Grid container direction='column' alignContent='center' justifyContent='flex-start'>
			<Grid item>
				<a href='/'>
					<Logo
						className={classes.logo}
						style={{ width: responsiveWidth(windowArray, 170, undefined, 0.24) }}
					/>
				</a>
			</Grid>
			<Grid
				style={{
					marginTop: responsiveHeight(windowArray, undefined, undefined, 0.1),
				}}
				container
				direction='column'
				justifyContent='flex-start'
				alignItems='center'
			>
				<form>
					<Grid item>
						<InputBase
							className={classes.input}
							style={{
								width: responsiveWidth(windowArray, 150, undefined, 0.2),
								height: responsiveHeight(windowArray, 30, undefined, 0.06),
							}}
							inputProps={{
								style: {
									margin: '0 1rem 0 1rem',
									fontSize: responsiveWidth(windowArray, undefined, 30, 0.017),
								},
							}}
							margin='dense'
							variant='outlined'
							placeholder='Nome de utilizador'
							autoComplete='username'
							onChange={handleChangeUsername}
							onKeyUp={handleKeyPress}
						/>
					</Grid>
					<br />
					<Grid item>
						<InputBase
							className={classes.input}
							style={{
								width: responsiveWidth(windowArray, 150, undefined, 0.2),
								height: responsiveHeight(windowArray, 30, undefined, 0.06),
							}}
							inputProps={{
								style: {
									margin: '0 1rem 0 1rem',
									fontSize: responsiveWidth(windowArray, undefined, 30, 0.017),
								},
							}}
							variant='outlined'
							placeholder='E-mail'
							autoComplete='email'
							onChange={handleChangeEmail}
							onKeyUp={handleKeyPress}
						/>
					</Grid>
					<br />
					<Grid item>
						<InputBase
							className={classes.input}
							style={{
								width: responsiveWidth(windowArray, 150, undefined, 0.2),
								height: responsiveHeight(windowArray, 30, undefined, 0.06),
							}}
							inputProps={{
								style: {
									margin: '0 1rem 0 1rem',
									fontSize: responsiveWidth(windowArray, undefined, 30, 0.017),
								},
							}}
							variant='outlined'
							placeholder='Password'
							type='password'
							autoComplete='password'
							onChange={handleChangePass1}
							onKeyUp={handleKeyPress}
						/>
					</Grid>
					<br />
					<Grid item>
						<InputBase
							className={classes.input}
							style={{
								width: responsiveWidth(windowArray, 150, undefined, 0.2),
								height: responsiveHeight(windowArray, 30, undefined, 0.06),
							}}
							inputProps={{
								style: {
									margin: '0 1rem 0 1rem',
									fontSize: responsiveWidth(windowArray, undefined, 30, 0.017),
								},
							}}
							variant='outlined'
							placeholder='Repete a password'
							type='password'
							autoComplete='password'
							onChange={handleChangePass2}
							onKeyUp={handleKeyPress}
						/>
					</Grid>
					<Grid
						item
						style={{
							marginTop: responsiveHeight(windowArray, undefined, undefined, 0.1),
						}}
					>
						<NormalButton
							fontSize={responsiveWidth(windowArray, 10, 45, 0.025)}
							text='Registar'
							onClick={handleClick}
						/>
					</Grid>
					<br />
					<Grid item>
						<Link
							className={classes.resetPasswordText}
							variant='h5'
							href='/login'
							style={{ fontSize: responsiveWidth(windowArray, undefined, 18, 0.02) }}
						>
							Já tens conta? Faz Login
						</Link>
					</Grid>
				</form>
			</Grid>
		</Grid>
	);
};

export default RegisterInput;
