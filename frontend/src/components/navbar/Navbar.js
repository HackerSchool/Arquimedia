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
	Grid,
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
import { logOut } from '../../api';
import { ReactComponent as OnlyBrainLogo } from '../../assets/onlyBrainLogo.svg';
import { ReactComponent as Detective } from '../../assets/detective.svg';

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
		svg: {
			height: responsiveHeight(windowArray, 200, undefined, 0.25),
		},
	};

	const handleLogout = () => {
		logOut();
		window.location.replace('/');
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
					) : windowArray.width < 900 ? (
						<div style={sxStyles.menuMobile}>
							<IconButton onClick={handleClick} size='large'>
								<MenuIcon fontSize='large' />
							</IconButton>
							<SwipeableDrawer
								open={click}
								onClose={handleClick}
								onOpen={handleClick}
							>
								{user ? (
									<Grid
										container
										direction='column'
										justifyContent='center'
										alignItems='center'
									>
										<List>
											<ListItem>
												<AvatarUser sx={sxStyles.avatar} user={user} />
											</ListItem>
											<ListItem>
												<NavbarButton href='/' text='Dashboard' />
											</ListItem>
											<ListItem>
												<NavbarButton href='/perfil' text='Perfil' />
											</ListItem>
											<ListItem>
												<NavbarButton
													href='/exames'
													text='Realizar Exames'
												/>
											</ListItem>
											<ListItem>
												<NavbarButton
													href='/leaderboards'
													text='Leaderboards'
												/>
											</ListItem>
											<ListItem>
												<NavbarButton href='/sobre' text='Sobre Nós' />
											</ListItem>
											<ListItem>
												<NavbarButton
													href=''
													text='Logout'
													onClick={handleLogout}
												/>
											</ListItem>
										</List>
										<Grid
											container
											direction='column'
											justifyContent='center'
											alignItems='center'
											align={'center'}
										>
											<Grid container direction='column' xs={12}>
												<Grid item>
													{' '}
													<Detective style={sxStyles.svg} />
												</Grid>
											</Grid>
										</Grid>
									</Grid>
								) : (
									<Grid
										container
										direction='column'
										justifyContent='center'
										alignItems='center'
									>
										<List>
											<ListItem>
												<OnlyBrainLogo style={sxStyles.avatar} />
											</ListItem>
											<ListItem>
												<NavbarButton href='/login' text='login' />
											</ListItem>
											<ListItem>
												<NavbarButton href='/register' text='registar' />
											</ListItem>
											<ListItem>
												<NavbarButton href='/' text='Página Inicial' />
											</ListItem>
											<ListItem>
												<NavbarButton href='/sobre' text='Sobre Nós' />
											</ListItem>
										</List>
										<Grid
											container
											direction='column'
											justifyContent='center'
											alignItems='center'
											align={'center'}
										>
											<Grid container direction='column' xs={12}>
												<Grid item>
													{' '}
													<Detective style={sxStyles.svg} />
												</Grid>
											</Grid>
										</Grid>
									</Grid>
								)}
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
