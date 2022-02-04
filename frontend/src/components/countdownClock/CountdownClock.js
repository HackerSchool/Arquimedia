import React, {useRef} from "react";
import {
	Paper,
	Typography,
} from "@material-ui/core";
import Countdown from 'react-countdown';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	clock: {
		width: "fit-content",
		padding: "0.5rem",
		backgroundColor: "#F9F9F9"
	},
	counter: {
		padding: "10px"
	},
	counter: (props) => ({
		color: theme.palette.secondary.main,
	}),
}))


// renderer changes the format on the CountdownClock
const renderer = props => {
	return (
		<span style={{color: (props.minutes === 0 && props.seconds < 30) ? "#EB5757" : "black"}}>
			{props.minutes}:{props.seconds < 10 && 0}{props.seconds}
		</span>
	)
}

const CountdownClock = (props) => {
	const classes = useStyles();
	const duration = useRef(props.duration * 1000 + Date.now());

	const completed = () => {
		setTimeout(() => {
			props.onComplete();
		}, 2000)
	}

	return (
		<Paper className={classes.clock}>
			<Typography variant="h4" className={classes.counter}>
				<Countdown 
					date={duration.current}
					renderer={renderer}
					onComplete={completed}
				/>
			</Typography>
		</Paper>
	)
}

export default CountdownClock;