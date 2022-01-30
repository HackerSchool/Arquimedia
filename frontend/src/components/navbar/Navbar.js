import React, { useState, useEffect } from 'react';
import {
	AppBar,
	Toolbar,
	IconButton,
	SwipeableDrawer,
	List,
	ListItem,
	Grid,
	Link
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import NavbarButton from './NavbarButton';
import { ReactComponent as Logo } from "../../assets/logo_blue.svg"
import NormalButton from '../buttons/NormalButton';


import {
	getUser
} from "../../api"
import MenuCircular from '../MenuCircular/MenuCircular';

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
		marginTop: "1.5rem",
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
		marginRight: "2rem",
		marginLeft: "-8rem",
		[theme.breakpoints.between(800,960)]: {
			marginLeft: "-16rem",
		},
		[theme.breakpoints.between(580, 800)]: {
			marginLeft: "-12rem",
		},
		[theme.breakpoints.down('xs')]: {
			marginLeft: "-3rem",
		},

	},
	logo: {
		[theme.breakpoints.down('xs')]: {
		height: 75,
		},
		[theme.breakpoints.between('xs','sm')]: {
			height: 95,
		},
		[theme.breakpoints.up('sm')]: {
			height: 114,
		},
	},
	registerBtn: {
		borderRadius: "15",
		color: "red"
	},
	circular: {
		paddingBottom: "1rem"
	}
}))


const Navbar = () => {
	const classes = useStyles();
	const [click, setClick] = useState(false);
	const [user, setUser] = useState({"id": null, "username": ""});
	const handleClick = () => {setClick(!click); console.log(click)};

	useEffect(() => {
		getUser((res) => {
			setUser(res.data);
		}, () => {
			console.log("Couldn't fetch user")
		})

	}, []);

	return (
		<AppBar position="static" className={classes.navbar}>
			<Toolbar className={classes.toolbar}>
				<Logo  className={classes.logo} />
				
				<Grid container className={classes.menu} justify="flex-end">
			
				{(user.id != null) ? 
					(
						<MenuCircular user={user}/>
				) : (
					<div>
						<Link href="/sobre" variant="h6" style={{marginRight:"3rem", color:"black"}}>Quem somos?</Link>
						<NormalButton text="Entrar" href="/login" fontSize={22} />
					</div>
				)}
	
				</Grid>

				<div className={classes.menuMobile}>
					<IconButton onClick={handleClick}>
						<MenuIcon fontSize="large"/>
					</IconButton>
					<SwipeableDrawer
						anchor='right'
						open={click}
						onClose={handleClick}
						onOpen={handleClick}
						>
						<List>
							<ListItem>
								{(user.id != null) ? (
									<MenuCircular user={user} />
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