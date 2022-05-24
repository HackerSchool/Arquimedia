import React from 'react';
import { Grid, Paper, Typography, IconButton } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import theme from '../globalTheme.js';
import { ReactComponent as Discord } from '../assets/icon_disc.svg';
import { ReactComponent as HackerSchool } from '../assets/icon_hs.svg';
import { ReactComponent as Instagram } from '../assets/icon_insta.svg';

const useStyles = makeStyles(() => ({
	rectangle: {
		width: '100%',
		height: '289px',
		flexWrap: 'nowrap',
		background: theme.palette.primary.main,
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
			<Grid className={classes.rectangle}>
				<Grid
					item
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
			</Grid>
			<Grid
				container
				direction='column'
				alignItems='center'
				justifyContent='center'
				style={{ minHeight: '0vh' }}
			>
				<Paper className={classes.paper}>
					<Grid
						item
						container
						direction='column'
						style={{ marginLeft: '5vh', marginTop: '5vh' }}
					>
						<Grid item>
							<Typography
								fontSize={40}
								fontFamily='Roboto'
								fontWeight={'bold'}
								color='black'
								style={{ minHeight: '7vh' }}
							>
								O Projeto
							</Typography>
						</Grid>
						<Grid item style={{ minHeight: '10vh', maxWidth: '100vh' }}>
							<Typography fontSize={20} fontFamily='Roboto' color='black'>
								Esta plataforma foi desenvolvida com o objetivo de facilitar o
								estudo a estudantes de ensino secundário, disponibilizando
								ferramentas de análise automática (index de performance) e geração
								personalizada de exames.
								<p>&nbsp;</p>
							</Typography>
							<Typography fontSize={20} fontFamily='Roboto' color='black'>
								Arquimedia será sempre disponibilizada de forma gratuita a todos os
								estudantes.
							</Typography>
						</Grid>
					</Grid>
					<Grid
						item
						container
						direction='column'
						style={{ marginLeft: '5vh', marginTop: '5vh' }}
					>
						<Grid item>
							<Typography
								fontSize={40}
								fontFamily='Roboto'
								fontWeight={'bold'}
								color='black'
								style={{ minHeight: '7vh' }}
							>
								Os estudantes
							</Typography>
						</Grid>
						<Grid item style={{ minHeight: '20vh', maxWidth: '100vh' }}>
							<Typography fontSize={20} fontFamily='Roboto' color='black'>
								Butão texto
							</Typography>
						</Grid>
					</Grid>
					<Grid
						item
						container
						direction='column'
						alignItems='center'
						justifyContent='center'
					>
						<Grid item>
							<Typography
								fontSize={40}
								fontFamily='Roboto'
								fontWeight={'bold'}
								color='black'
							>
								Acompanha!
							</Typography>
						</Grid>
					</Grid>
					<Grid
						container
						spacing={3}
						style={{ maxWidth: '35vh', minHeight: '15vh', marginLeft: '22rem' }}
					>
						<Grid item xs={4}>
							<IconButton>
								<Discord
									className={classes.hover}
									onClick={() => {
										window.location.href = 'https://discord.gg/3Fgxs8pJMh';
									}}
								/>
							</IconButton>
						</Grid>
						<Grid item xs={4}>
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
						<Grid item xs={4}>
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
