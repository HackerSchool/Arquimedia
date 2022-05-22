import React from 'react';
import { Grid, Paper, Typography, ListItem, List } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles/';
import theme from '../globalTheme';
import IconButton from '../components/buttons/IconButton';
import { ReactComponent as ExamIcon } from '../assets/examIcon.svg';
import { ReactComponent as ProfileIcon } from '../assets/profileIcon.svg';
import { ReactComponent as LeaderboardIcon } from '../assets/leaderboardIcon.svg';
import { ReactComponent as AnswersIcon } from '../assets/answersIcon.svg';

const useStyles = makeStyles(() => ({
	paper: {
		width: '88%',
		borderRadius: 40,
		border: '3px solid #D9D9D9',
		boxShadow: '-6px 4px 6px rgba(0, 0, 0, 0.25)',
		margin: '0 auto',
	},
	container: {
		width: '100%',
		height: '100%',
		padding: '3rem',
	},
	icon: {
		fontSize: 100,
	},
	bold: {
		fontWeight: 600,
	},
	futureText: {
		fontWeight: 500,
		margin: '0px 10px',
	},
}));

export const HomePage = () => {
	const classes = useStyles();

	return (
		<Paper theme={theme} className={classes.paper}>
			<Grid
				container
				direction='column'
				justifyContent='flex-start'
				alignItems='flex-start'
				className={classes.container}
				spacing={4}
			>
				<Grid item xs={1}>
					<Typography className={classes.bold} variant='h4'>
						{' '}
						O que fazer ...
					</Typography>
				</Grid>

				{/* Home Buttons */}
				<Grid style={{ margin: '20px 0px' }} item xs={5}>
					<Grid
						spacing={5}
						container
						direction='row'
						justifyContent='flex-start'
						alignItems='center'
					>
						<Grid item xs={3}>
							<IconButton
								direction='column'
								fontSize={25}
								text='Resolver exames'
								iconFirst={false}
								alignItems='flex-start'
								height='23vh'
								width='12vw'
								href='/exames'
							>
								<ExamIcon className={classes.icon} />
							</IconButton>
						</Grid>
						<Grid item xs={3}>
							<IconButton
								direction='column'
								fontSize={25}
								text='Ver o teu perfil'
								iconFirst={false}
								alignItems='flex-start'
								height='23vh'
								width='12vw'
								href='/perfil'
							>
								<ProfileIcon className={classes.icon} />
							</IconButton>
						</Grid>
						<Grid item xs={3}>
							<IconButton
								direction='column'
								fontSize={25}
								text='Ver a Leaderboard'
								iconFirst={false}
								alignItems='flex-start'
								height='23vh'
								width='12vw'
								href='/leaderboards'
							>
								<LeaderboardIcon className={classes.icon} />
							</IconButton>
						</Grid>
						<Grid item xs={3}>
							<IconButton
								direction='column'
								fontSize={25}
								text='Contribui com perguntas'
								iconFirst={false}
								alignItems='flex-start'
								height='23vh'
								width='12vw'
								href='/leaderboards'
							>
								<AnswersIcon className={classes.icon} />
							</IconButton>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={1}>
					<Typography className={classes.bold} variant='h4'>
						{' '}
						O que estamos a preparar para ti ...
					</Typography>
				</Grid>
				<Grid item xs={true}>
					<List bull>
						<ListItem>
							<Typography className={classes.futureText} variant='h5'>
								{' '}
								• Resolução de Perguntas
							</Typography>
						</ListItem>
						<ListItem>
							<Typography className={classes.futureText} variant='h5'>
								{' '}
								• Análise do Estudo
							</Typography>
						</ListItem>
						<ListItem>
							<Typography className={classes.futureText} variant='h5'>
								{' '}
								• Interacção com os teus amigos
							</Typography>
						</ListItem>
						<ListItem>
							<Typography className={classes.futureText} variant='h5'>
								{' '}
								• Fornadas de Perguntas 🍞 e mais disciplinas 📚
							</Typography>
						</ListItem>
						<ListItem>
							<Typography className={classes.futureText} variant='h5'>
								{' '}
								• Troféus 🏆
							</Typography>
						</ListItem>
					</List>
				</Grid>
			</Grid>
		</Paper>
	);
};
