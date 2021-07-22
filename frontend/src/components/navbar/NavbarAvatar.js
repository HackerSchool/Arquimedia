import React, {useState} from 'react';
import {
	Button,
	Avatar,
	Menu,
	MenuItem
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

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
					<MenuItem onClick={handleClose} component="a" href="/logout">Logout</MenuItem>
				</Menu>
			</div>)
}

export default NavbarAvatar;