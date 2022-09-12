import React from 'react';
import { Grid, Typography, ListItem, List } from '@mui/material';
import IconButton from '../components/buttons/IconButton';
import { ReactComponent as ExamIcon } from '../assets/examIcon.svg';
import { ReactComponent as ProfileIcon } from '../assets/profileIcon.svg';
import { ReactComponent as LeaderboardIcon } from '../assets/leaderboardIcon.svg';
import { ReactComponent as AnswersIcon } from '../assets/answersIcon.svg';
import { ReactComponent as DiscordIcon } from '../assets/icons8-discord-new-96.svg';
import useWindowDimensions from '../hooks/useWindowDimensions';
import responsiveWidth from '../hooks/responsiveWidth';
import Box from '../components/box/Box';

export const HomePage = () => {
	const windowArray = useWindowDimensions();

	const sxStyles = {
		paper: {
			borderRadius: 40,
			border: '3px solid #D9D9D9',
			boxShadow: '-6px 4px 6px rgba(0, 0, 0, 0.25)',
			margin: '0 auto',
		},
		container: {
			padding: '3rem',
		},
		bold: {
			fontWeight: 600,
		},
		futureText: {
			fontWeight: 500,
			margin: '0px 10px',
		},
		homepageButton: {
			height: {
				md: responsiveWidth(windowArray, 150, undefined, 0.12),
				sm: responsiveWidth(windowArray, 195, undefined, 0.25),
				xs: responsiveWidth(windowArray, 160, undefined, 0.5),
			},
			width: {
				md: responsiveWidth(windowArray, 135, undefined, 0.11),
				sm: responsiveWidth(windowArray, 180, undefined, 0.25),
				xs: responsiveWidth(windowArray, 160, undefined, 0.5),
			},
		},
		icon: {
			width: responsiveWidth(windowArray, 40, undefined, 0.03),
		},

		homebuttonsArray: { margin: '20px 0px' },
	};
	return (
		<Grid container direction='row' justifyContent='center' alignItems='center'>
			{' '}
			<Grid container direction='row' justifyContent='center' alignItems='center' xs={11}>
				{' '}
				<Box>
					<Grid
						container
						direction='column'
						justifyContent='flex-start'
						alignItems='flex-start'
						sx={sxStyles.container}
						spacing={4}
						align={'center'}
					>
						<Grid item xs={1}>
							<Typography sx={sxStyles.bold} variant='h4'>
								{' '}
								O que fazer ...
							</Typography>
						</Grid>

						{/* Home Buttons */}
						<Grid sx={sxStyles.homebuttonsArray} item xs={5}>
							<Grid
								spacing={5}
								container
								direction={'row'}
								justifyContent='space-around'
								alignItems='center'
							>
								<Grid item xs={12} sm={6} md={2}>
									<IconButton
										direction='column'
										fontSize={responsiveWidth(windowArray, 20, 40, 0.015)}
										text='Resolver exames'
										iconFirst={false}
										alignItems='flex-start'
										href='/exames'
										sx={sxStyles.homepageButton}
									>
										<ExamIcon style={sxStyles.icon} />
									</IconButton>
								</Grid>
								<Grid item xs={12} sm={6} md={2}>
									<IconButton
										direction='column'
										fontSize={responsiveWidth(windowArray, 20, 40, 0.015)}
										text='Ver o teu perfil'
										iconFirst={false}
										alignItems='flex-start'
										href='/perfil'
										sx={sxStyles.homepageButton}
									>
										<ProfileIcon style={sxStyles.icon} />
									</IconButton>
								</Grid>
								<Grid item xs={12} sm={6} md={2}>
									<IconButton
										direction='column'
										fontSize={responsiveWidth(windowArray, 20, 40, 0.015)}
										text='Ver a Leaderboard'
										iconFirst={false}
										alignItems='flex-start'
										href='/leaderboards'
										sx={sxStyles.homepageButton}
									>
										<LeaderboardIcon style={sxStyles.icon} />
									</IconButton>
								</Grid>
								<Grid item xs={12} sm={6} md={2}>
									<IconButton
										direction='column'
										fontSize={responsiveWidth(windowArray, 20, 40, 0.015)}
										text='Contribui com perguntas'
										iconFirst={false}
										alignItems='flex-start'
										href='/submeter_questao'
										sx={sxStyles.homepageButton}
									>
										<AnswersIcon style={sxStyles.icon} />
									</IconButton>
								</Grid>
								<Grid item xs={12} sm={6} md={2}>
									<IconButton
										direction='column'
										fontSize={responsiveWidth(windowArray, 20, 40, 0.015)}
										text='Junta-te ao nosso Discord'
										iconFirst={false}
										alignItems='flex-start'
										href='https://discord.gg/3Fgxs8pJMh'
										target='_blank'
										sx={sxStyles.homepageButton}
									>
										<DiscordIcon style={sxStyles.icon} />
									</IconButton>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={1}>
							<Typography sx={sxStyles.bold} variant='h4'>
								{' '}
								O que estamos a preparar para ti ...
							</Typography>
						</Grid>
						<Grid item xs={true}>
							<List bull='true'>
								<ListItem>
									<Typography sx={sxStyles.futureText} variant='h5'>
										{' '}
										• Resolução de Perguntas
									</Typography>
								</ListItem>
								<ListItem>
									<Typography sx={sxStyles.futureText} variant='h5'>
										{' '}
										• Análise do Estudo
									</Typography>
								</ListItem>
								<ListItem>
									<Typography sx={sxStyles.futureText} variant='h5'>
										{' '}
										• Interacção com os teus amigos
									</Typography>
								</ListItem>
								<ListItem>
									<Typography sx={sxStyles.futureText} variant='h5'>
										{' '}
										• Fornadas de Perguntas 🍞 e mais disciplinas 📚
									</Typography>
								</ListItem>
								<ListItem>
									<Typography sx={sxStyles.futureText} variant='h5'>
										{' '}
										• Troféus 🏆
									</Typography>
								</ListItem>
							</List>
						</Grid>
					</Grid>
				</Box>
			</Grid>
		</Grid>
	);
};
