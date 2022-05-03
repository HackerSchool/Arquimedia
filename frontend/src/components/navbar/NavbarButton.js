import React from 'react';
import { Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(() => ({
	menuItems: {
		fontSize: 18,
	},
}));

const NavbarButton = (props) => {
	const classes = useStyles();
	const color = window.location.pathname === props.href ? 'orange' : 'grey';

	return (
		<Button className={classes.menuItems} style={{ color: color }} href={props.href}>
			{props.text}
		</Button>
	);
};

export default NavbarButton;
