import React, { useState } from 'react';
import {
	Grid,
	Paper,
	Typography,
	Divider,
	List,
	ListItemButton,
	ListItemText,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles/';
import theme from '../globalTheme';
import config from '../config';
import { TextInput } from '../components/inputs/TextInput';
import { useSnackbar } from 'notistack';
import { changePassword } from '../api';

const useStyles = makeStyles(() => ({
	paper: {
		width: '100%',
		height: '80vh',
		borderRadius: 40,
		border: '3px solid #D9D9D9',
		boxShadow: '-6px 4px 6px rgba(0, 0, 0, 0.25)',
	},
	container: {
		width: '100%',
		height: '100%',
		padding: '3rem',
	},
	settings: {
		paddingLeft: '4rem',
	},
	menu: {
		paddingRight: '3rem',
	},
	settingsSubTitle: {
		paddingBottom: '2rem',
	},
	button: {
		color: theme.palette.secondary.main,
		borderColor: theme.palette.secondary.main,
		borderWidth: 4,
		root: {
			fontSize: 24,
		},
		'&:hover': {
			backgroundColor: theme.palette.secondary.main,
			borderColor: theme.palette.secondary.main,
			color: '#FFF',
			borderWidth: 4,
		},
	},
	buttonConfirmDelete: {
		color: '#000',
		borderColor: '#000',
		borderWidth: 4,
		root: {
			fontSize: 24,
		},
		'&:hover': {
			backgroundColor: '#000',
			borderColor: '#000',
			color: '#FFF',
			borderWidth: 4,
		},
	},
}));

export const SettingsPage = () => {
	const classes = useStyles();
	const { enqueueSnackbar } = useSnackbar();
	const [menuOption, setMenuOption] = useState('Conta');
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [newPasswordRep, setNewPasswordRep] = useState('');
	const [dialogOpen, setDialogOpen] = useState(false);

	const handleDelete = () => {
		// delete the account
		console.log('delete');
	};

	const handleChangePassword = () => {
		// change the password
		console.log(currentPassword + newPassword + newPasswordRep);
		if (newPassword !== newPasswordRep)
			enqueueSnackbar('Novas passwords têm de ser iguais', { variant: 'error' });
		else if (newPassword === currentPassword)
			enqueueSnackbar('Nova password não pode ser igual à password atual', {
				variant: 'error',
			});
		else {
			// fazer request ao backend
			changePassword(
				currentPassword,
				newPassword,
				newPasswordRep,
				() => {
					enqueueSnackbar('Password mudada com sucesso!', {
						variant: 'success',
					});
				},
				(error) => {
					if (error.response.data.new_password2) {
						error.response.data.new_password2.forEach((msg) => {
							if (
								msg ===
								'This password is too short. It must contain at least 8 characters.'
							)
								enqueueSnackbar(
									'A sua palavra-passe é demasiado curta (pelo menos 8 caracteres).',
									{ variant: 'error' }
								);
							if (msg === 'This password is too common.')
								enqueueSnackbar('A sua palavra-passe é demasiado comum.', {
									variant: 'error',
								});
						});
					} else if (error.response.data.old_password)
						enqueueSnackbar('Password atual errada!', {
							variant: 'error',
						});
					else {
						enqueueSnackbar('Erro na mudança de password!', {
							variant: 'error',
						});
					}
				}
			);
		}
	};

	const renderMenu = () => {
		return (
			<List className={classes.menu}>
				{config.settingsMenu.map((option) => (
					<ListItemButton
						className={classes.menuItem}
						onClick={() => {
							setMenuOption(option);
						}}
						key={option}
						value={option}
					>
						<ListItemText>
							<Typography
								variant='h4'
								fontWeight='bold'
								color={option === menuOption && theme.palette.secondary.main}
							>
								{option}
							</Typography>
						</ListItemText>
					</ListItemButton>
				))}
			</List>
		);
	};

	const renderAccountSettings = () => {
		return (
			<Grid container>
				<Grid item container direction='column'>
					<Grid item>
						<Typography
							variant='h4'
							fontWeight='bold'
							className={classes.settingsSubTitle}
						>
							Mudar Password
						</Typography>
					</Grid>
					<Grid item>
						<Typography variant='h5'>Password atual</Typography>
						<TextInput
							type='password'
							backgroundColor='#D9D9D9'
							fontSize={24}
							style={{ marginBottom: '1rem' }}
							onChange={(e) => setCurrentPassword(e.target.value)}
						/>
					</Grid>
					<Grid item>
						<Typography variant='h5'>Password nova</Typography>
						<TextInput
							type='password'
							backgroundColor='#D9D9D9'
							fontSize={24}
							style={{ marginBottom: '1rem' }}
							onChange={(e) => setNewPassword(e.target.value)}
						/>
					</Grid>
					<Grid item>
						<Typography variant='h5'>Password nova repetição</Typography>
						<TextInput
							type='password'
							backgroundColor='#D9D9D9'
							fontSize={24}
							style={{ marginBottom: '1rem' }}
							onChange={(e) => setNewPasswordRep(e.target.value)}
						/>
					</Grid>
					<Grid item>
						<Button
							className={classes.button}
							variant='outlined'
							size='large'
							onClick={handleChangePassword}
						>
							Confirmar
						</Button>
					</Grid>
					<Grid item>
						<Typography
							variant='h4'
							fontWeight='bold'
							className={classes.settingsSubTitle}
							style={{ paddingTop: '3rem' }}
						>
							Apagar conta
						</Typography>
					</Grid>
					<Grid item>
						<Button
							className={classes.button}
							variant='outlined'
							size='large'
							onClick={() => setDialogOpen(true)}
						>
							QUERO APAGAR A MINHA CONTA
						</Button>
						<Dialog
							open={dialogOpen}
							className={classes.dialog}
							sx={{ '& .MuiDialog-paper': { borderRadius: 5 } }}
						>
							<DialogTitle>Apagar Conta</DialogTitle>
							<DialogContent>
								<Typography variant='h4' style={{ marginBottom: '2rem' }}>
									Tens a certeza que queres apagar a conta?
								</Typography>
								<Typography variant='h5'>
									Insere a password para continuar
								</Typography>
								<TextInput
									type='password'
									backgroundColor={theme.palette.secondary.main}
									fontColor='#FFF'
									fontSize={24}
									style={{ marginBottom: '1rem' }}
									onChange={(e) => setCurrentPassword(e.target.value)}
								/>
							</DialogContent>
							<DialogActions>
								<Button
									variant='outlined'
									size='large'
									autofocus
									className={classes.button}
									onClick={() => setDialogOpen(false)}
								>
									Cancelar
								</Button>
								<Button
									size='large'
									variant='outlined'
									className={classes.buttonConfirmDelete}
									onClick={handleDelete}
								>
									Confirmar
								</Button>
							</DialogActions>
						</Dialog>
					</Grid>
				</Grid>
			</Grid>
		);
	};

	const renderPrivacySettings = () => {
		return (
			<Typography variant='h4' fontWeight='bold'>
				🚧 Em construção 🚧
			</Typography>
		);
	};

	return (
		<Paper theme={theme} className={classes.paper}>
			<Grid container className={classes.container}>
				<Grid item xs={3}>
					{/* Menu */}
					{renderMenu()}
				</Grid>

				<Divider orientation='vertical' flexItem className={classes.divider} />

				<Grid item className={classes.settings}>
					{/* Settings */}
					{menuOption === 'Conta' ? renderAccountSettings() : renderPrivacySettings()}
				</Grid>
			</Grid>
		</Paper>
	);
};
