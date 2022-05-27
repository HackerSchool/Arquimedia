import React from 'react';
import { Grid, Typography, IconButton } from '@mui/material';
import { ReactComponent as InDev } from '../assets/software-engineer-amico.svg';
import { ReactComponent as Logo } from '../assets/logo_blue.svg';
import { ReactComponent as Insta } from '../assets/instagram-icon.svg';
import { ReactComponent as Discord } from '../assets/discord-icon.svg';
//import theme from '../globalTheme';

export const MobileWarningPage = () => {
	return (
		<Grid container align='center' style={{ padding: '2rem' }} spacing={4} direction='column'>
			<Grid item>
				<Logo style={{ maxWidth: 280, height: 'auto' }} />
			</Grid>
			<Grid item>
				<Typography variant='h5' style={{ fontWeight: 'bold' }}>
					Desculpa, ainda estamos a trabalhar em acesso mobile
				</Typography>
			</Grid>
			<Grid item>
				<InDev style={{ width: '100%', height: 'auto' }} />
			</Grid>
			<Grid item>
				<Typography variant='h5' style={{ fontWeight: 'bold' }}>
					Junta-te às nossas comunidades para estares a par de novidades
				</Typography>
			</Grid>
			<Grid item>
				<IconButton
					onClick={() => {
						window.location.href = 'https://www.instagram.com/arquimedia.pt/';
					}}
				>
					<Insta />
				</IconButton>
				<IconButton>
					<Discord
						style={{ borderRadius: 11 }}
						onClick={() => {
							window.location.href = 'https://discord.gg/3Fgxs8pJMh';
						}}
					/>
				</IconButton>
			</Grid>
		</Grid>
	);
};
