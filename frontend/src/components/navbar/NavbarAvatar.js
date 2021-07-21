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
				<Button onClick={handleClick}><Avatar className={classes.avatar}>{props.user.username[0]}</Avatar></Button>
				<Menu
					id="menu"
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={handleClose}
				>
					<MenuItem onClick={handleClose}>Perfil</MenuItem>
					<MenuItem onClick={handleClose}>Exames</MenuItem> 
					<MenuItem onClick={handleClose}>Preferências</MenuItem>
				</Menu>
			</div>)
}

export default NavbarAvatar;