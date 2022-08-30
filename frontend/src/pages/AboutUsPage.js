import React from 'react';
import { Grid, Paper, Typography, IconButton } from '@mui/material';
import theme from '../globalTheme.js';
import { ReactComponent as Discord } from '../assets/icon_disc_3.svg';
import { ReactComponent as HackerSchool } from '../assets/icon_hs_3.svg';
import { ReactComponent as Instagram } from '../assets/icon_insta_1.svg';
import config from '../config';
import Title from '../components/typographies/Title.js';
import Body from '../components/typographies/Body.js';
import responsiveWidth from '../hooks/responsiveWidth.js';
import Description from '../components/typographies/Description';

export const AboutUsPage = () => {
	const sxStyles = {
		rectangle: {
			height: '30vh',
			flexWrap: 'nowrap',
			background: theme.palette.primary.main,
			minHeight: '20vh',
		},
		bigTitle: {
			marginTop: '-7vh',
			fontSize: responsiveWidth(undefined, 40, undefined, 0.035),
		},
		paper: {
			borderRadius: 20,
			border: '3px solid #D9D9D9',
			boxShadow: '-6px 4px 6px rgba(0, 0, 0, 0.25)',
			padding: responsiveWidth(undefined, undefined, undefined, 0.002),
			marginTop: '-7vh',
		},
		text: {
			wordWrap: 'break-word',
			padding: '2rem',
		},
		devName: { display: 'inline-block' },
		devSocials: { display: 'inline-block' },
		hover: {
			width: responsiveWidth(undefined, undefined, 75, 0.13),
			transition: 'transform 0.15s ease-in-out',
			'&:hover': {
				transform: 'scale(1.05,1.05)',
				boxShadow: '0px 6px 4px #Bbb9b9',
			},
		},
	};

	return (
		<Grid container direction='column' justifyContent='center' alignItems='center'>
			<Grid
				sx={sxStyles.rectangle}
				container
				direction='column'
				align='center'
				justifyContent='center'
			>
				<Grid item>
					<Typography
						variant='h2'
						fontWeight={'bold'}
						color='white'
						sx={sxStyles.bigTitle}
					>
						Quem somos...
					</Typography>
				</Grid>
			</Grid>
			<Grid container direction='row' justifyContent='center' alignItems='center'>
				<Grid
					container
					direction='row'
					justifyContent='center'
					alignItems='center'
					xs={11}
					sm={10}
				>
					{' '}
					<Grid container direction='column' alignItems='center' justifyContent='center'>
						<Paper sx={sxStyles.paper}>
							<Grid container>
								<Grid item sx={sxStyles.text}>
									<Title variant='h3'>O Projeto</Title>
									<Body variant='h6'>
										Esta plataforma foi desenvolvida com o objetivo de facilitar
										o estudo a estudantes de ensino secundário, disponibilizando
										ferramentas de análise automática (index de performance) e
										geração personalizada de exames.
									</Body>
									<Body variant='h6'>
										Arquimedia será sempre disponibilizada de forma gratuita a
										todos os estudantes.
									</Body>
								</Grid>
								<Grid item sx={sxStyles.text}>
									<Title variant='h3'>De estudantes para estudantes</Title>
									<Body variant='h6'>
										Este projeto foi desenvolvido ao abrigo do núcleo
										Hackerschool do Instituto Superior Técnico.
									</Body>
									<Body variant='h6' style={{ paddingTop: '2rem' }}>
										Até à data, contribuiram:
									</Body>
									<Grid container>
										<Typography variant='h6'>
											{config.devs.map((dev) => {
												return (
													<li key={dev.name}>
														<Description
															variant='h6'
															style={sxStyles.devName}
														>
															{dev.name}
														</Description>{' '}
														{dev.socials.map((social) => {
															return (
																<IconButton
																	key={social}
																	href={social.url}
																	target='_blank'
																	rel='noreferrer'
																>
																	{social.component}
																</IconButton>
															);
														})}
													</li>
												);
											})}
										</Typography>
									</Grid>
								</Grid>
							</Grid>
							<Grid
								container
								direction='column'
								alignItems='center'
								justifyContent='center'
							>
								<Grid item>
									<Title>Acompanha!</Title>
								</Grid>
							</Grid>
							<Grid
								container
								align='center'
								alignItems='center'
								justifyContent='center'
								style={{ minHeight: '10vh' }}
								spacing={2}
							>
								<Grid item>
									<IconButton
										href='https://discord.gg/3Fgxs8pJMh'
										target='_blank'
										rel='noreferrer'
									>
										<Discord style={sxStyles.hover} />
									</IconButton>
								</Grid>
								<Grid item>
									<IconButton
										href='https://www.instagram.com/arquimedia.pt/'
										target='_blank'
										rel='noreferrer'
									>
										<Instagram style={sxStyles.hover} />
									</IconButton>
								</Grid>
								<Grid item>
									<IconButton
										href='http://hackerschool.tecnico.ulisboa.pt/'
										target='_blank'
										rel='noreferrer'
									>
										<HackerSchool style={sxStyles.hover} />
									</IconButton>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};
