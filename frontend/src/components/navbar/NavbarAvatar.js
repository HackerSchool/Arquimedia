import React from 'react';
import {
	Button,
	Avatar,
	Menu,
	MenuItem
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { logOut } from '../../api';

const useStyles = makeStyles(theme => ({
	avatar: {
		width: "50px",
		height: "50px"
	},
	button: {
		'&:hover': {
			borderRadius: 90
		}
	}
}))

const NavbarAvatar = (props) => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const classes = useStyles();

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null);
	}

	const handleLogout = () => {
		handleClose();
		logOut();
		window.location.replace("/");
	}

	return (<div>
				<Button onClick={handleClick} className={classes.button}><Avatar className={classes.avatar}>{props.user.username[0]}</Avatar></Button>
				<Menu
					id="menu"
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={handleClose}
				>
					<MenuItem onClick={handleClose} component="a" href="/perfil">Perfil</MenuItem>
					<MenuItem onClick={handleClose} component="a" href="/exames">Exames</MenuItem> 
					<MenuItem onClick={handleClose} component="a" href="/preferencias">Preferências</MenuItem>
					<MenuItem onClick={handleLogout} component="a">Logout</MenuItem>
				</Menu>
			</div>)
}

export default NavbarAvatar;