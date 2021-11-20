import React from "react";
import {
	Grid,
	Paper
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from "react";
import {
	getUser,
	getProfile,
	getXpEvents
} from "../api";

const useStyles = makeStyles(theme => ({
	page: {
		marginTop: "80px"
	}
}));

const ResultsPage = (props) => {
	const classes = useStyles();
	const [profile, setProfile] = useState();
	const [xpEvents, setXpEvents] = useState();

	useEffect(() => {
		getUser((res1) => {
			getProfile(res1.data.id, (res2) => {
				setProfile(res2.data);
			});
			getXpEvents(res1.data.id, (res3) => {
				setXpEvents(res3.data);
			});
		});
	}, []);

	return (
		<Grid container align="center" spacing={4} xs={12} className={classes.page} >
			<Grid item xs={4}> {/* General Info */}
				<Paper> {/* delete this component when implementing */}
					This is where the General info pannel will be
				</Paper>
			</Grid>
			<Grid item xs={8}> {/* XP Graph */}
				<Paper> {/* delete this component when implementing */}
					This is where the XP Graph pannel will be
				</Paper>
			</Grid>
			<Grid item xs={4}> {/* Subject info */}
				<Paper> {/* delete this component when implementing */}
					This is where the subject info pannel will be
				</Paper>
			</Grid>
			<Grid item xs={8}> {/* Subject Achievements Info */}
				<Paper> {/* delete this component when implementing */}
					This is where the subject achievements pannel will be
				</Paper>	
			</Grid>
		</Grid>
	);
};

export default ResultsPage;