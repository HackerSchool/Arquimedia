import React from 'react';
import { Grid, Typography } from '@mui/material';
import AvatarUser from '../avatar/AvatarUser';
import LinearProgress from '@mui/material/LinearProgress';
import makeStyles from '@mui/styles/makeStyles';
import withStyles from '@mui/styles/withStyles';

const useStyles = makeStyles(() => ({
	avatar: {
		width: '125px',
		height: '125px',
	},
	esquerda: {
		textAlign: 'left',
		marginLeft: '60px',
		padding: '5px',
	},
	xpBar: {
		colorPrimary: 'pink',
		colorSecondary: 'blue',
	},
	colorPrimary: {
		backgroundColor: '#FFFFFF',
	},
	barColorPrimary: {
		backgroundColor: '#00FF47',
	},
}));

const BorderLinearProgress = withStyles({
	root: {
		height: 20,
		width: '80%',
		backgroundColor: '#FFFFFF',
		borderRadius: 20,
	},
	bar: {
		borderRadius: 20,
		backgroundColor: '#00FF47',
	},
})(LinearProgress);

export const ProfileBasicInfo = ({ profile }) => {
	const classes = useStyles();

	const currentDay = new Date();
	const last_activity = new Date(profile.last_activity);
	const hasGainedXpToday =
		currentDay.getDate() === last_activity.getDate() &&
		currentDay.getMonth() === last_activity.getMonth() &&
		currentDay.getFullYear() === last_activity.getFullYear();

	return (
		<Grid container>
			<Grid item xs={12} style={{ padding: '10px' }}>
				<AvatarUser className={classes.avatar} user={profile.user} />
			</Grid>
			<Grid item xs={12}>
				<Typography variant='h4'>@{profile.user.username}</Typography>
			</Grid>
			<Grid item xs={12} className={classes.esquerda}>
				<Typography variant='h6'>Nível: {profile.xp.currentLevel}</Typography>
			</Grid>
			<Grid item xs={12} className={classes.esquerda}>
				<div className={classes.linear}>
					<BorderLinearProgress
						variant='determinate'
						value={(profile.xp.xp / profile.xp.levelXP) * 100}
					/>
				</div>
			</Grid>
			<Grid item xs={12} className={classes.esquerda}>
				<Typography variant='h6'>
					Streak: {profile.streak} {hasGainedXpToday ? '🔥' : '🕯️'}
				</Typography>
			</Grid>
			<Grid item xs={12} className={classes.esquerda}>
				<Typography variant='h6'>A seguir: {profile.follows.length}</Typography>
			</Grid>
		</Grid>
	);
};
