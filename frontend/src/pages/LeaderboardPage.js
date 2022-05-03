import React, { useState, useEffect } from 'react';
import { Grid, Paper, Select, MenuItem, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { fetchLeaderboard } from '../api';
import Loading from '../components/loading/Loading';
import LeaderboardBar from '../components/profile/LeaderboardBar';
import globalTheme from '../globalTheme';
import Pagination from '@mui/material/Pagination';

const SPANS = ['sempre', 'mês', 'dia'];

const TO_ENGLISH = {
	mês: 'month',
	dia: 'day',
	sempre: 'alltime',
};

const USERS_PER_PAGE = 10;

const useStyles = makeStyles(() => ({
	panel: {
		width: '70%',
		marginRight: 'auto',
		marginLeft: 'auto',
	},
	dropdown: {
		fontSize: globalTheme.typography.h4.fontSize,
		'&.gutters': {
			fontSize: globalTheme.typography.h4.fontSize,
		},
		color: globalTheme.palette.secondary.main,
	},
	title: {
		marginLeft: '1rem',
	},
	pagination: {
		paddingBottom: '1rem',
	},
}));

function LeaderboardPage() {
	const [leaderboard, setLeaderboard] = useState([]);
	const [span, setSpan] = useState('sempre');
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [numberOfPages, setNumberOfPages] = useState();

	const classes = useStyles();

	useEffect(() => {
		fetchLeaderboard(TO_ENGLISH[span], page, (res) => {
			setLeaderboard(res.data.users);
			setNumberOfPages(
				res.data.length > USERS_PER_PAGE ? Math.ceil(res.data.length / USERS_PER_PAGE) : 1
			);
			setLoading(false);
		});
	}, [span, page]);

	if (loading) return <Loading />;

	const handleChange = (event) => {
		setSpan(event.target.value);
		setLoading(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const pageChange = (event, value) => {
		setPage(value);
	};

	const renderLeaderboard = leaderboard.map((user, index) => (
		<LeaderboardBar key={user.id} id={user.id} xp={user.xp} place={index + 1} page={page - 1} />
	));

	return (
		<Paper className={classes.panel}>
			<Typography variant='h4' className={classes.title}>
				Leaderboard {span === 'sempre' ? 'de' : 'do'} <span />
				<Select
					labelId='demo-controlled-open-select-label'
					id='demo-controlled-open-select'
					open={open}
					onClose={handleClose}
					onOpen={handleOpen}
					value={span}
					onChange={handleChange}
					className={classes.dropdown}
				>
					{SPANS.map((span) => (
						<MenuItem key={span} value={span}>
							{span}
						</MenuItem>
					))}
				</Select>
			</Typography>

			<Grid container>{renderLeaderboard}</Grid>

			<Grid container justifyContent='center' className={classes.pagination}>
				<Pagination
					onChange={pageChange}
					defaultPage={1}
					color='secondary'
					count={numberOfPages}
				/>
			</Grid>
		</Paper>
	);
}

export default LeaderboardPage;
