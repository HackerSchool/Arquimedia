import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { logOut } from '../../api';
import MenuCircular from '../MenuCircular/MenuCircular';

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
				
				<MenuCircular userLetter={props.user.username[0]}>
				</MenuCircular>
				
			</div>)
}

export default NavbarAvatar;