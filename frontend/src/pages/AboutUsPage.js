import React from 'react';
import { Grid, Paper, Typography, IconButton } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import theme from '../globalTheme.js';
import { ReactComponent as Discord } from '../assets/icon_disc_3.svg';
import { ReactComponent as HackerSchool } from '../assets/icon_hs_3.svg';
import { ReactComponent as Instagram } from '../assets/icon_insta_1.svg';
import { ReactComponent as LinkedIn } from '../assets/icon_linked.svg';

const useStyles = makeStyles(() => ({
	rectangle: {
		width: '142%',
		height: '289px',
		flexWrap: 'nowrap',
		background: theme.palette.primary.main,
		marginLeft: '-20%',
	},

	paper: {
		width: '70%',
		height: '70%',
		borderRadius: 20,
		border: '3px solid #D9D9D9',
		boxShadow: '-6px 4px 6px rgba(0, 0, 0, 0.25)',
		marginTop: '-75px',
	},

	font: {
		fontsize: 100,
	},

	hover: {
		transition: 'transform 0.15s ease-in-out',
		'&:hover': {
			transform: 'scale(1.2,1.2)',
			boxShadow: '0px 6px 4px #Bbb9b9',
		},
	},
}));

export const AboutUsPage = () => {
	const classes = useStyles();

	return (
		<div>
			<Grid
				className={classes.rectangle}
				container
				direction='column'
				align='center'
				justifyContent='center'
				style={{ minHeight: '25vh' }}
				spacing={1}
			>
				<Grid item>
					<Typography
						fontSize={70}
						fontFamily='Nexa-Trial'
						fontWeight={'bold'}
						color='white'
					>
						Quem somos...
					</Typography>
				</Grid>
			</Grid>
			<Grid container direction='column' alignItems='center' justifyContent='center'>
				<Paper className={classes.paper}>
					<Grid item container style={{ marginTop: '5vh' }}>
						<Grid item style={{ wordWrap: 'break-word', padding: '2rem' }}>
							<Typography
								variant='h3'
								fontFamily='Roboto'
								fontWeight={'bold'}
								style={{ minHeight: '7vh' }}
								color='black'
							>
								O Projeto
							</Typography>
							<Typography
								variant='h6'
								fontFamily='Roboto'
								color='black'
								style={{ minHeight: '13vh' }}
							>
								Esta plataforma foi desenvolvida com o objetivo de facilitar o
								estudo a estudantes de ensino secundário, disponibilizando
								ferramentas de análise automática (index de performance) e geração
								personalizada de exames.
							</Typography>
							<Typography variant='h6' fontFamily='Roboto' color='black'>
								Arquimedia será sempre disponibilizada de forma gratuita a todos os
								estudantes.
							</Typography>
						</Grid>
						<Grid item style={{ wordWrap: 'break-word', padding: '2rem' }}>
							<Typography
								variant='h3'
								fontFamily='Roboto'
								fontWeight={'bold'}
								color='black'
								style={{ minHeight: '7vh' }}
							>
								De estudantes para estudantes
							</Typography>
							<Typography
								variant='h6'
								fontFamily='Roboto'
								color='black'
								style={{ minHeight: '5vh' }}
							>
								Este projeto foi desenvolvido ao abrigo do núcleo Hackerschool
								<a> do Instituto Superior Técnico.</a>
							</Typography>
							<Typography variant='h6' style={{ minHeight: '4vh' }}>
								Até à data, contribuiram:
							</Typography>
							<Grid container spacing={2}>
								<Grid item xs={4}>
									<Grid container spacing={0.9} direction='column'>
										<Grid item>
											<Typography
												variant='h6'
												style={{
													wordWrap: 'break-word',
													paddingLeft: '2rem',
												}}
											>
												<li>Jerónimo Mendes</li>
											</Typography>
										</Grid>
										<Grid item>
											<Typography
												variant='h6'
												style={{
													wordWrap: 'break-word',
													paddingLeft: '2rem',
												}}
											>
												<li>Miguel Dinis</li>
											</Typography>
										</Grid>
										<Grid item>
											<Typography
												variant='h6'
												style={{
													wordWrap: 'break-word',
													paddingLeft: '2rem',
												}}
											>
												<li>Nuno Marques</li>
											</Typography>
										</Grid>
										<Grid item>
											<Typography
												variant='h6'
												style={{
													wordWrap: 'break-word',
													paddingLeft: '2rem',
												}}
											>
												<li>Afonso Domingues</li>
											</Typography>
										</Grid>
										<Grid item>
											<Typography
												variant='h6'
												style={{
													wordWrap: 'break-word',
													paddingLeft: '2rem',
												}}
											>
												<li>Ana Mourão</li>
												<p>&nbsp;</p>
											</Typography>
										</Grid>
									</Grid>
								</Grid>
								<Grid item>
									<Grid container direction='column'>
										<Grid item>
											<IconButton>
												<LinkedIn
													className={classes.hover}
													onClick={() => {
														window.location.href =
															'https://www.linkedin.com/in/jer%C3%B3nimo-mendes/';
													}}
												/>
											</IconButton>
										</Grid>
										<Grid item>
											<IconButton>
												<LinkedIn
													className={classes.hover}
													onClick={() => {
														window.location.href =
															'https://www.linkedin.com/in/miguel-dinis-de-sousa-a009851ba/';
													}}
												/>
											</IconButton>
										</Grid>
										<Grid item>
											<IconButton>
												<LinkedIn
													className={classes.hover}
													onClick={() => {
														window.location.href =
															'https://discord.gg/3Fgxs8pJMh';
													}}
												/>
											</IconButton>
										</Grid>
										<Grid item>
											<IconButton>
												<LinkedIn
													className={classes.hover}
													onClick={() => {
														window.location.href =
															'https://discord.gg/3Fgxs8pJMh';
													}}
												/>
											</IconButton>
										</Grid>
										<Grid item>
											<IconButton>
												<LinkedIn
													className={classes.hover}
													onClick={() => {
														window.location.href =
															'https://discord.gg/3Fgxs8pJMh';
													}}
												/>
											</IconButton>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
					<Grid container direction='column' alignItems='center' justifyContent='center'>
						<Grid item>
							<Typography
								variant='h3'
								fontFamily='Roboto'
								fontWeight={'bold'}
								color='black'
								style={{ minHeight: '7vh' }}
							>
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
							<IconButton>
								<Discord
									className={classes.hover}
									onClick={() => {
										window.location.href = 'https://discord.gg/3Fgxs8pJMh';
									}}
								/>
							</IconButton>
						</Grid>
						<Grid item xs={1.3}>
							<IconButton>
								<Instagram
									className={classes.hover}
									onClick={() => {
										window.location.href =
											'https://www.instagram.com/arquimedia.pt/';
									}}
								/>
							</IconButton>
						</Grid>
						<Grid item xs={1.3}>
							<IconButton>
								<HackerSchool
									className={classes.hover}
									onClick={() => {
										window.location.href =
											'http://hackerschool.tecnico.ulisboa.pt/';
									}}
								/>
							</IconButton>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		</div>
	);
};
