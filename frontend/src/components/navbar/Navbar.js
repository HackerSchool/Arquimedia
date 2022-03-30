import React, { useState, useContext } from 'react';
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
import AvatarUser from '../avatar/AvatarUser';
import MenuCircular from '../MenuCircular/MenuCircular';
import { userContext } from '../../context/UserContextProvider';
import Loading from '../loading/Loading'


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
		height: 90,
		marginBottom: "3rem"
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
		marginRight: "20rem",
		marginLeft: "2rem"
	},
	logo: {
		height: 114,
	},
	registerBtn: {
		borderRadius: "15",
		color: "red"
	},
	circular: {
		paddingBottom: "1rem"
	},
	avatar: {
        width: 80,
        height: 80,
		
    }
}))


const Navbar = () => {
	const classes = useStyles();
	const [click, setClick] = useState(false);
	const handleClick = () => {setClick(!click); console.log(click)};
	const [user, loading] = useContext(userContext);

	return (
		<AppBar position="static" className={classes.navbar}>
			<Toolbar className={classes.toolbar}>
				<Logo className={classes.logo} />
				
				<Grid container className={classes.menu} justify="flex-end">
			
				{user ? 
					(
						<MenuCircular user={user}/>
				) : ( loading ? (<Loading />) : (
					<div>
						<Link href="/sobre" variant="h6" style={{marginRight:"3rem", color:"black"}}>Quem somos?</Link>
						<NormalButton text="Entrar" href="/login" fontSize={22} />
					</div>
				))}
	
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
								{user ? (
									<AvatarUser className={classes.avatar} user={user} />

						) : (
							<NavbarButton href="/login" text="login" /> ||
							<NavbarButton href="/register" text="registar" />
						)}
							</ListItem>

							<ListItem>
								<NavbarButton href="/" text="Home" />
							</ListItem>
							<ListItem>
								<NavbarButton href="/perfil" text="Perfil" />
							</ListItem>
							<ListItem>
								<NavbarButton href="/exames" text="Realizar Exames" />
							</ListItem>
							<ListItem>
								<NavbarButton href="/leaderboards" text="Leaderboards" />
							</ListItem>
							<ListItem>
								<NavbarButton href="/contact" text="Contactos" />
							</ListItem>
							<ListItem>
								<NavbarButton href="" text="Logout" />
							</ListItem>





						</List>
					</SwipeableDrawer>
					
						
				</div>
			</Toolbar>
		</AppBar>
	)
};

export default Navbar;