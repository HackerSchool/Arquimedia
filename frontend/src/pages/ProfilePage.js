import React from 'react';
import { Grid, Paper } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useEffect, useState } from 'react';
import { getUser, getProfile, getXpEvents } from '../api';
import XPGraph from '../components/xp/XPGraph';
import Loading from '../components/loading/Loading';
import SubjectInfoPanel from '../components/subject/SubjectInfoPanel';
import { ProfileBasicInfo } from '../components/profile/ProfileBasicInfo';
import AchievementTray from '../components/achievements/AchievementTray';

const useStyles = makeStyles(() => ({
	panel: {
		borderRadius: 20,
		border: '2px solid #D9D9D9',
		boxShadow: '-3px 3px 10px #D9D9D9',
		height: '100%',
	},
}));

const ProfilePage = () => {
	const classes = useStyles();
	const [profile, setProfile] = useState();
	const [xpEvents, setXpEvents] = useState();
	const [loading, setLoading] = useState(true);
	const [selectedSubject, setSelectedSubject] = useState('Geral');

	useEffect(() => {
		getUser((res1) => {
			getProfile(res1.data.id, (res2) => {
				getXpEvents(res1.data.id, (res3) => {
					setXpEvents(res3.data);
					setLoading(false);
				});
				setProfile(res2.data);
			});
		});
	}, []);

	if (loading) return <Loading />;

	return (
		<Grid container align='center' spacing={3} xs={12} className={classes.body}>
			<Grid item xs={4}>
				{' '}
				{/* General Info */}
				<Paper className={classes.panel}>
					<ProfileBasicInfo profile={profile} XPEvents={xpEvents} />
				</Paper>
			</Grid>
			<Grid item xs={8}>
				{' '}
				{/* XP Graph */}
				<Paper className={classes.panel}>
					<XPGraph xpEvents={xpEvents} />
				</Paper>
			</Grid>
			<Grid item xs={4}>
				{' '}
				{/* Subject info */}
				<Paper className={classes.panel}>
					<SubjectInfoPanel profile={profile} changeSubject={setSelectedSubject} />
				</Paper>
			</Grid>
			<Grid item xs={8}>
				{' '}
				{/* Subject Achievements Info */}
				<Paper className={classes.panel}>
					<AchievementTray
						achievements={profile.achievements}
						subjectProp={selectedSubject}
					/>
				</Paper>
			</Grid>
			<Grid item xs={12}></Grid>
		</Grid>
	);
};

export default ProfilePage;
