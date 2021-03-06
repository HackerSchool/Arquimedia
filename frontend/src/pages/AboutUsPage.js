import React from 'react';
import { Grid, Paper, Typography, IconButton } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import theme from '../globalTheme.js';
import { ReactComponent as Discord } from '../assets/icon_disc_3.svg';
import { ReactComponent as HackerSchool } from '../assets/icon_hs_3.svg';
import { ReactComponent as Instagram } from '../assets/icon_insta_1.svg';
import config from '../config';

const useStyles = makeStyles(() => ({
	rectangle: {
		width: '100vw',
		height: '30vh',
		flexWrap: 'nowrap',
		background: theme.palette.primary.main,
	},
	paper: {
		width: '105vh',
		borderRadius: 20,
		border: '3px solid #D9D9D9',
		boxShadow: '-6px 4px 6px rgba(0, 0, 0, 0.25)',
		marginTop: '-75px',
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

	hover: {
		transition: 'transform 0.15s ease-in-out',
		'&:hover': {
			transform: 'scale(1.05,1.05)',
			boxShadow: '0px 6px 4px #Bbb9b9',
		},
	},
}));

export const AboutUsPage = () => {
	const classes = useStyles();

	return (
		<div
			style={{
				overflowX: 'hidden',
				marginLeft: '-12em',
				marginRight: '-12em',
				paddingBottom: '4rem',
			}}
		>
			<Grid
				className={classes.rectangle}
				container
				direction='column'
				align='center'
				justifyContent='center'
				style={{ minHeight: '20vh' }}
			>
				<Grid item>
					<Typography
						variant='h2'
						fontWeight={'bold'}
						color='white'
						style={{ marginTop: '-7vh' }}
					>
						Quem somos...
					</Typography>
				</Grid>
			</Grid>
			<Grid container direction='column' alignItems='center' justifyContent='center'>
				<Paper className={classes.paper}>
					<Grid container>
						<Grid item className={classes.text}>
							<Typography variant='h3' fontWeight={'bold'} className={classes.title}>
								O Projeto
							</Typography>
							<Typography variant='h6' className={classes.body}>
								Esta plataforma foi desenvolvida com o objetivo de facilitar o
								estudo a estudantes de ensino secund??rio, disponibilizando
								ferramentas de an??lise autom??tica (index de performance) e gera????o
								personalizada de exames.
							</Typography>
							<Typography variant='h6'>
								Arquimedia ser?? sempre disponibilizada de forma gratuita a todos os
								estudantes.
							</Typography>
						</Grid>
						<Grid item className={classes.text}>
							<Typography variant='h3' fontWeight={'bold'} className={classes.title}>
								De estudantes para estudantes
							</Typography>
							<Typography variant='h6' className={classes.title}>
								Este projeto foi desenvolvido ao abrigo do n??cleo Hackerschool do
								Instituto Superior T??cnico.
							</Typography>
							<Typography variant='h6' className={classes.title}>
								At?? ?? data, contribuiram:
							</Typography>
							<Grid container>
								<Typography variant='h6' className={classes.name}>
									{config.devs.map((dev) => {
										return (
											<li key={dev.name}>
												<Typography
													variant='h6'
													style={{
														display: 'inline-block',
														minWidth: '20vh',
													}}
												>
													{dev.name}
												</Typography>{' '}
												<Typography
													style={{
														display: 'inline-block',
													}}
												>
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
					<Grid container direction='column' alignItems='center' justifyContent='center'>
						<Grid item>
							<Typography variant='h3' fontWeight={'bold'} className={classes.text}>
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
								<Discord className={classes.hover} />
							</IconButton>
						</Grid>
						<Grid item xs={1.3}>
							<IconButton
								href='https://www.instagram.com/arquimedia.pt/'
								target='_blank'
								rel='noreferrer'
							>
								<Instagram className={classes.hover} />
							</IconButton>
						</Grid>
						<Grid item xs={1.3}>
							<IconButton
								href='http://hackerschool.tecnico.ulisboa.pt/'
								target='_blank'
								rel='noreferrer'
							>
								<HackerSchool className={classes.hover} />
							</IconButton>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		</div>
	);
};
