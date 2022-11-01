import React from 'react';
import { IconButton, Menu, MenuItem, ListItemIcon, Typography, Divider } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AvatarUser from '../avatar/AvatarUser';
import makeStyles from '@mui/styles/makeStyles';
import theme from '../../globalTheme';
import { Link } from 'react-router-dom';
import { logOut } from '../../api';

const useStyles = makeStyles((theme) => ({
	item: {
		textDecoration: 'none',
		fontWeight: 'bold',
		color: 'black',
		fontSize: '22px',
	},
	logout: {
		textDecoration: 'none',
		fontWeight: 'bold',
		color: theme.palette.secondary.main,
		fontSize: '22px',
	},
}));

const MenuCircular = (props) => {
	const classes = useStyles(theme);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		setAnchorEl(null);
		logOut();
		window.location.replace('/');
	};

	return (
		<>
			<IconButton size='large' onClick={handleClick}>
				<AvatarUser
					user={props.user}
					sx={props.sx ? props.sx : { width: 90, height: 90 }}
				/>
			</IconButton>
			<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
				<MenuItem onClick={handleClose} component={Link} to='/perfil'>
					<ListItemIcon>
						<AccountCircleIcon />
					</ListItemIcon>
					<Typography className={classes.item}>Perfil</Typography>
				</MenuItem>
				<MenuItem onClick={handleClose} component={Link} to='/configuracoes'>
					<ListItemIcon>
						<SettingsIcon />
					</ListItemIcon>
					<Typography className={classes.item}>Configurações</Typography>
				</MenuItem>
				<Divider />
				<MenuItem onClick={handleLogout}>
					<ListItemIcon>
						<LogoutIcon />
					</ListItemIcon>
					<Typography className={classes.logout}>Sair</Typography>
				</MenuItem>
			</Menu>
		</>
	);
};

export default MenuCircular;
