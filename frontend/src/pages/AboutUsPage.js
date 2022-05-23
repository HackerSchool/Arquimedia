import React from 'react';
import { Grid, Paper, Typography, IconButton } from '@mui/material';
import { Link } from "react-router-dom";
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

	image: {
		widht: '70px',
		height: '70px',
		borderRadius: 11,
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
				spacing={0}
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
								Texto
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
						direction='row'
						alignItems='center'
						justifyContent='center'
						style={{ maxWidth: '35vh', minHeight: '15vh', marginLeft: '18.5%' }}
					>
						<Grid item xs={4}>
							<IconButton>
								<Discord
									style={{ borderRadius: 1 }}
									className={classes.image}
									onClick={() => {                    
									window.location.href = 'https://discord.gg/3Fgxs8pJMh';}}
								/>
							</IconButton>
						</Grid>
						<Grid item xs={4}>	
							<IconButton>
								<Instagram
									style={{ borderRadius: 1 }}
									className={classes.image}
									onClick={() => {                    
									window.location.href = 'https://discord.gg/3Fgxs8pJMh';}}
								/>
							</IconButton>
						</Grid>
						<Grid item xs={4}>
							<IconButton>
								<HackerSchool
									style={{ borderRadius: 1 }}
									className={classes.image}
									onClick={() => {                    
									window.location.href = 'https://discord.gg/3Fgxs8pJMh';}}
								/>
							</IconButton>
						</Grid>

					</Grid>
				</Paper>
			</Grid>
		</div>
	);
};
