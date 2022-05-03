import { Grid, Typography } from '@mui/material';
import { React, useState, useEffect } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { getAllAchievements } from '../../api';
import Loading from '../loading/Loading';
import Achievement from './Achievement';

const useStyles = makeStyles(() => ({
	outterbox: {
		padding: '1rem',
	},
	achievement: {
		marginRight: '3rem',
	},
}));

function AchievementTray({ achievements, subjectProp }) {
	const filterAchievements = (toFilter, subject) => {
		// Geral includes all the achievements
		if (subject === 'Geral') return toFilter;

		const res = toFilter.filter((object) => object.subject === subject);

		if (res === undefined) return [];

		return res;
	};

	const classes = useStyles();
	const [allAchievements, setAllAchievements] = useState();
	const [loading, setLoading] = useState(true);
	const [achievementsToDisplay, setAchievementsToDisplay] = useState([]);

	// Updates the achievements to the current selected subject
	useEffect(() => {
		setAchievementsToDisplay(filterAchievements(allAchievements, subjectProp));
	}, [subjectProp, allAchievements]);

	useEffect(() => {
		getAllAchievements((res) => {
			setAllAchievements(res.data);
			setAchievementsToDisplay(filterAchievements(res.data, subjectProp));
			setLoading(false);
		});
	}, [subjectProp]);

	if (loading) return <Loading />;

	return (
		<Grid className={classes.outterbox} container direction='column'>
			<Grid item xs={12}>
				<Typography variant='h5'>Medalhas</Typography>
			</Grid>

			<Grid item container xs={3} justifyContent='flex-start'>
				{achievementsToDisplay.map((i) => (
					<Grid item xs={1} className={classes.achievement}>
						<Achievement
							achievement={i}
							achieved={achievements.some((j) => j.id === i.id)}
						/>
					</Grid>
				))}
			</Grid>
		</Grid>
	);
}

export default AchievementTray;
