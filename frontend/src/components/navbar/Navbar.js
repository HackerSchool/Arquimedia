import React, { useState, useContext } from 'react';
import {
	AppBar,
	Toolbar,
	IconButton,
	SwipeableDrawer,
	List,
	ListItem,
	Link,
	Box,
	Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import MenuIcon from '@mui/icons-material/Menu';
import NavbarButton from './NavbarButton';
import { ReactComponent as Logo } from '../../assets/logo_blue.svg';
import NormalButton from '../buttons/NormalButton';
import AvatarUser from '../avatar/AvatarUser';
import { userContext } from '../../context/UserContextProvider';
import Loading from '../loading/Loading';
import MenuCircular from '../MenuCircular/MenuCircular';
import { Link as LinkRouter } from 'react-router-dom';
import theme from '../../globalTheme';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import responsiveHeight from '../../hooks/responsiveHeight';

let useStyles = makeStyles((theme) => ({
	menuButton: {
		marginRight: theme.spacing(2),
		color: 'grey',
	},
	title: {
		flexGrow: 1,
		color: 'grey',
	},
	navbar: {
		backgroundColor: theme.palette.background.default,
		boxShadow: theme.shadows[0],
		marginTop: '1.5rem',
		height: 90,
	},
	menu: {
		[theme.breakpoints.down('md')]: {
			display: 'none',
		},
	},
	menuMobile: {
		color: 'grey',
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
	toolbar: {
		height: 300,
		marginRight: '20rem',
		marginLeft: '20rem',
	},
	logo: {
		height: '5rem',
		width: 'auto',
		margin: 0,
	},
	registerBtn: {
		borderRadius: '15',
		color: 'red',
	},
	circular: {
		paddingBottom: '1rem',
	},
	avatar: {
		width: 80,
		height: 80,
	},
	link: {
		textDecoration: 'none',
		color: 'black',
		fontSize: '22px',
		marginLeft: theme.spacing(2),
		transition: 'all 0.15s ease-in-out',
		'&:hover': { color: theme.palette.secondary.main },
		paddingRight: '2rem',
		fontWeight: 'bold',
	},
}));

const Navbar = () => {
	const classes = useStyles(theme);
	const [click, setClick] = useState(false);
	const handleClick = () => {
		setClick(!click);
	};
	const [user, loading] = useContext(userContext);
	const windowArray = useWindowDimensions();

	return (
		<Box
			sx={{
				flexGrow: 1,
				alignItems: 'center',
				display: 'flex',
			}}
		>
			<AppBar
				position='static'
				className={classes.navbar}
				style={{
					marginBottom: responsiveHeight(windowArray, undefined, undefined, 0.05),
				}}
			>
				<Toolbar className={classes.toolbar}>
					<a href='/' style={{ flexGrow: 1 }}>
						<Logo className={classes.logo} />
					</a>

					{loading ? (
						<Loading />
					) : user ? (
						<div style={{ right: 0, display: 'flex', alignItems: 'center' }}>
							<Typography
								className={classes.link}
								component={LinkRouter}
								to='/exames'
							>
								Gerar Exame
							</Typography>
							<Typography
								className={classes.link}
								component={LinkRouter}
								to='/leaderboards'
							>
								Leaderboards
							</Typography>
							<MenuCircular user={user} />
						</div>
					) : (
						<div>
							<Link
								href='/sobre'
								variant='h6'
								style={{ marginRight: '3rem', color: 'black' }}
							>
								Quem somos?
							</Link>
							<NormalButton text='Entrar' href='/login' fontSize={22} />
						</div>
					)}

					<div className={classes.menuMobile}>
						<IconButton onClick={handleClick} size='large'>
							<MenuIcon fontSize='large' />
						</IconButton>
						<SwipeableDrawer open={click} onClose={handleClick} onOpen={handleClick}>
							<List>
								<ListItem>
									{user ? (
										<AvatarUser className={classes.avatar} user={user} />
									) : (
										<NavbarButton href='/login' text='login' /> || (
											<NavbarButton href='/register' text='registar' />
										)
									)}
								</ListItem>

								<ListItem>
									<NavbarButton href='/' text='Home' />
								</ListItem>
								<ListItem>
									<NavbarButton href='/perfil' text='Perfil' />
								</ListItem>
								<ListItem>
									<NavbarButton href='/exames' text='Realizar Exames' />
								</ListItem>
								<ListItem>
									<NavbarButton href='/leaderboards' text='Leaderboards' />
								</ListItem>
								<ListItem>
									<NavbarButton href='/contact' text='Contactos' />
								</ListItem>
								<ListItem>
									<NavbarButton href='' text='Logout' />
								</ListItem>
							</List>
						</SwipeableDrawer>
					</div>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Navbar;
