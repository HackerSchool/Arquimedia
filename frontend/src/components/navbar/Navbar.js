import React, { useState, useEffect } from 'react';
import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	SwipeableDrawer,
	List,
	ListItem,
	Grid
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import FunctionsIcon from '@material-ui/icons/Functions';
import MenuIcon from '@material-ui/icons/Menu';
import NavbarButton from './NavbarButton';


import {
	getUser
} from "../../api"
import Loading from '../loading/Loading';
import MenuCircular from '../MenuCircular/MenuCircular';

const TITLE = "HS ao Quadrado"

const useStyles = makeStyles(theme => ({
	menuButton: {
		marginRight: theme.spacing(2),
		color: "grey"
	},
	title: {
		flexGrow: 1,
		color: "grey",
	},
	navbar: {
		backgroundColor: "white",
		boxShadow: theme.shadows[0],
		padding: 0,
		height: 90
	},
	menu: {
		[theme.breakpoints.down("sm")]: {
			display: "none"
		},
	},
	menuMobile: {
		color: "grey",
		[theme.breakpoints.up("md")]: {
			display: "none"
		}
	},
	toolbar: {
		height: 300,
		marginRight: "10%",
		marginLeft: "10%"
	}
}))


const Navbar = () => {
	const classes = useStyles();
	const [click, setClick] = useState(false);
	const [user, setUser] = useState({"id": null, "username": ""});
	const handleClick = () => {setClick(!click); console.log(click)};
	const [loading, setLoading] = useState(true);

	useEffect(() => {

		getUser((res) => {
			setUser(res.data);
			setLoading(false);
		}, () => {
			console.log("Couldn't fetch user")
		})

	}, []);


	return (
		<AppBar position="static" className={classes.navbar}>
			<Toolbar className={classes.toolbar}>
				<IconButton edge="start" color="inherit" aria-label="menu" className={classes.menuButton}>
				<FunctionsIcon fontSize="large" />
				</IconButton>
				<Typography variant="h4" className={classes.title}>{TITLE}</Typography>
				
				<Grid container className={classes.menu} justify="flex-end">
					
				{(loading) ? (
					<Loading/>
				) : [
						(user.id != null) ? 
							(
								<List>
									<MenuCircular userLetter={user.username[0]} />
								</List>
						) : (
							<List>
							<NavbarButton href="/registar" text="registar" />
							<NavbarButton href="/login" text="login" /> 
							</List>
						)
					]
				}	
	
				</Grid>

				<div className={classes.menuMobile}>
					<IconButton onClick={handleClick}>
						<MenuIcon fontSize="large"/>
					</IconButton>
					<SwipeableDrawer
						open={click}
						onClose={handleClick}
						onOpen={handleClick}
						>
						<List>
							<ListItem>
								{(user.id != null) ? (
									<MenuCircular userLetter={user.username[0]} />
						) : (
							<NavbarButton href="/login" text="login" /> ||
							<NavbarButton href="/register" text="registar" />
						)}
							</ListItem>

							<ListItem>
								<NavbarButton href="/" text="Home" />
							</ListItem>
							
							<ListItem>
								<NavbarButton href="/contact" text="Contactos" />
							</ListItem>
						</List>
					</SwipeableDrawer>
					
						
				</div>
			</Toolbar>
		</AppBar>
	)
};

export default Navbar;