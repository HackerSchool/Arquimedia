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
import responsiveWidth from '../../hooks/responsiveWidth';

const Navbar = () => {
	const [click, setClick] = useState(false);
	const handleClick = () => {
		setClick(!click);
	};
	const [user, loading] = useContext(userContext);
	const windowArray = useWindowDimensions();

	const sxStyles = {
		navbar: {
			backgroundColor: theme.palette.background.default,
			boxShadow: theme.shadows[0],
			marginTop: '1.5rem',
			height: 90,
			marginBottom: responsiveHeight(windowArray, undefined, 10, 0.01),
		},
		menuMobile: {
			color: 'grey',
		},
		toolbar: {
			height: 300,
			justifyContent: windowArray.width >= 900 ? 'space-around' : 'space-between',
		},
		logo: {
			height: responsiveHeight(windowArray, undefined, 100, 0.08),
			width: 'auto',
		},
		avatar: {
			height: responsiveHeight(windowArray, 50, 100, 0.1),
			width: 'auto',
		},
		link: {
			textDecoration: 'none',
			color: 'black',
			fontSize: responsiveWidth(windowArray, 15, 35, 0.0125),
			marginLeft: theme.spacing(2),
			transition: 'all 0.15s ease-in-out',
			'&:hover': { color: theme.palette.secondary.main },
			paddingRight: '2rem',
			fontWeight: 'bold',
		},
	};

	const sxStyles = {
		navbar: {
			backgroundColor: theme.palette.background.default,
			boxShadow: theme.shadows[0],
			marginTop: '1.5rem',
			height: 90,
			marginBottom: responsiveHeight(windowArray, undefined, 10, 0.01),
		},
		menuMobile: {
			color: 'grey',
		},
		toolbar: {
			height: 300,
			justifyContent: windowArray.width >= 1000 ? 'space-around' : 'space-between',
		},
		logo: {
			height: '5rem',
			width: 'auto',
			margin: 0,
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
	};

	return (
		<Box>
			<AppBar position='static' sx={sxStyles.navbar}>
				<Toolbar sx={sxStyles.toolbar}>
					<a href='/'>
						<Logo style={sxStyles.logo} />
					</a>

					{loading ? (
						<Loading />
					) : user && windowArray.width >= 900 ? (
						<div style={{ right: 0, display: 'flex', alignItems: 'center' }}>
							<Typography sx={sxStyles.link} component={LinkRouter} to='/exames'>
								Gerar Exame
							</Typography>
							<Typography
								sx={sxStyles.link}
								component={LinkRouter}
								to='/leaderboards'
							>
								Leaderboards
							</Typography>
							<MenuCircular user={user} sx={sxStyles.avatar} />
						</div>
					) : user ? (
						<div style={sxStyles.menuMobile}>
							<IconButton onClick={handleClick} size='large'>
								<MenuIcon fontSize='large' />
							</IconButton>
							<SwipeableDrawer
								open={click}
								onClose={handleClick}
								onOpen={handleClick}
							>
								<List>
									<ListItem>
										{user ? (
											<AvatarUser sx={sxStyles.avatar} user={user} />
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
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Navbar;
