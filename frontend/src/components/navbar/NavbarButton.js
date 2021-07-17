import React from 'react';
import {
	Button
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	menuItems: {
		fontSize: 18
	}
}))


const NavbarButton = (props) => {
	const classes = useStyles();
	const color = (window.location.pathname === props.href) ? "orange" : "grey";

	return <Button className={classes.menuItems} style={{color: color}} href={props.href}>{props.text}</Button>
}

export default NavbarButton;