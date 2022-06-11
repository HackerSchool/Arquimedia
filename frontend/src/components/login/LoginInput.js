import { Grid, InputBase, Link } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { logIn } from '../../api';
import React, { useState } from 'react';
import NormalButton from '../buttons/NormalButton';
import { ReactComponent as Logo } from '../../assets/logo_white.svg';
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

const LoginInput = () => {
	const classes = useStyles();

	const [username, setUsername] = useState(null);
	const [password, setPassword] = useState(null);

	const handleChangeUsername = (e) => setUsername(e.target.value);
	const handleChangePassword = (e) => setPassword(e.target.value);

	const { enqueueSnackbar } = useSnackbar();
	const windowArray = useWindowDimensions();

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
			container
			direction='column'
			alignContent='center'
			justifyContent='flex-start'
			style={{ height: windowArray.height }}
		>
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
				spacing={3}
				direction='column'
				justifyContent='flex-start'
				alignItems='center'
			>
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
						onChange={handleChangeUsername}
						onKeyUp={handleKeyPress}
					/>
				</Grid>
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
								fontSize: responsiveWidth(windowArray, 10, 30, 0.017),
							},
						}}
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
						style={{ fontSize: responsiveWidth(windowArray, undefined, 18, 0.02) }}
						variant='h5'
						href='/password/reset'
					>
						Não sabes a tua Password ?
					</Link>
				</Grid>
				<Grid
					item
					style={{ marginTop: responsiveHeight(windowArray, undefined, undefined, 0.05) }}
				>
					<NormalButton
						fontSize={responsiveWidth(windowArray, 10, 45, 0.025)}
						text='Entrar'
						onClick={handleClick}
					/>
				</Grid>
				<Grid item>
					<Link
						className={classes.resetPasswordText}
						variant='h5'
						href='/registar'
						style={{ fontSize: responsiveWidth(windowArray, undefined, 18, 0.02) }}
					>
						Ainda não tens conta? Regista-te
					</Link>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default LoginInput;
