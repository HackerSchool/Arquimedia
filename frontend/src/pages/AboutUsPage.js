import React from 'react';
import { Grid, Paper, Typography, IconButton } from '@mui/material';
import theme from '../globalTheme.js';
import { ReactComponent as Discord } from '../assets/icon_disc_3.svg';
import { ReactComponent as HackerSchool } from '../assets/icon_hs_3.svg';
import { ReactComponent as Instagram } from '../assets/icon_insta_1.svg';
import config from '../config';

export const AboutUsPage = () => {
	const sxStyles = {
		rectangle: {
			width: '100vw',
			height: '30vh',
			flexWrap: 'nowrap',
			background: theme.palette.primary.main,
			minHeight: '20vh',
		},
		bigTitle: {
			marginTop: '-7vh',
		},
		paper: {
			borderRadius: 20,
			border: '3px solid #D9D9D9',
			boxShadow: '-6px 4px 6px rgba(0, 0, 0, 0.25)',
			marginTop: '-25px',
			padding: '2rem',
		},

		text: {
			wordWrap: 'break-word',
			padding: '2rem',
		},

		body: {
			minHeight: '12vh',
		},

		title: {
			minHeight: '7vh',
		},

		name: {
			wordWrap: 'break-word',
			paddingLeft: '2rem',
		},
		devName: { display: 'inline-block', minWidth: '20vh' },
		devSocials: { display: 'inline-block' },
		hover: {
			transition: 'transform 0.15s ease-in-out',
			'&:hover': {
				transform: 'scale(1.05,1.05)',
				boxShadow: '0px 6px 4px #Bbb9b9',
			},
		},
	};

	return (
		<div
			style={{
				overflowX: 'hidden',
			}}
		>
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
				<Grid container direction='row' justifyContent='center' alignItems='center' xs={10}>
					{' '}
					<Grid container direction='column' alignItems='center' justifyContent='center'>
						<Paper sx={sxStyles.paper}>
							<Grid container>
								<Grid item sx={sxStyles.text}>
									<Typography
										variant='h3'
										fontWeight={'bold'}
										sx={sxStyles.title}
									>
										O Projeto
									</Typography>
									<Typography variant='h6' sx={sxStyles.body}>
										Esta plataforma foi desenvolvida com o objetivo de facilitar
										o estudo a estudantes de ensino secundário, disponibilizando
										ferramentas de análise automática (index de performance) e
										geração personalizada de exames.
									</Typography>
									<Typography variant='h6'>
										Arquimedia será sempre disponibilizada de forma gratuita a
										todos os estudantes.
									</Typography>
								</Grid>
								<Grid item sx={sxStyles.text}>
									<Typography
										variant='h3'
										fontWeight={'bold'}
										sx={sxStyles.title}
									>
										De estudantes para estudantes
									</Typography>
									<Typography variant='h6' sx={sxStyles.title}>
										Este projeto foi desenvolvido ao abrigo do núcleo
										Hackerschool do Instituto Superior Técnico.
									</Typography>
									<Typography variant='h6' sx={sxStyles.title}>
										Até à data, contribuiram:
									</Typography>
									<Grid container>
										<Typography variant='h6' sx={sxStyles.name}>
											{config.devs.map((dev) => {
												return (
													<li key={dev.name}>
														<Typography
															variant='h6'
															sx={sxStyles.devName}
														>
															{dev.name}
														</Typography>{' '}
														<Typography sx={sxStyles.devSocials}>
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
														</Typography>
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
									<Typography variant='h3' fontWeight={'bold'} sx={sxStyles.text}>
										Acompanha!
									</Typography>
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
								<Grid item xs={1.3}>
									<IconButton
										href='https://discord.gg/3Fgxs8pJMh'
										target='_blank'
										rel='noreferrer'
									>
										<Discord sx={sxStyles.hover} />
									</IconButton>
								</Grid>
								<Grid item xs={1.3}>
									<IconButton
										href='https://www.instagram.com/arquimedia.pt/'
										target='_blank'
										rel='noreferrer'
									>
										<Instagram sx={sxStyles.hover} />
									</IconButton>
								</Grid>
								<Grid item xs={1.3}>
									<IconButton
										href='http://hackerschool.tecnico.ulisboa.pt/'
										target='_blank'
										rel='noreferrer'
									>
										<HackerSchool sx={sxStyles.hover} />
									</IconButton>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
};
