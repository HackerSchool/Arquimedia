import {
	Paper,
	Typography,
} from "@material-ui/core";
import Countdown from 'react-countdown';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	clock: {
		width: "fit-content"
	},
	counter: {
		padding: "10px"
	}
}))


// renderer changes the format on the CountdownClock
const renderer = props => {
	return (
		<span>
			{props.minutes}:{props.seconds}
		</span>
	)
}

const CountdownClock = (props) => {
	const classes = useStyles();
	const duration = props.duration * 1000 + Date.now();

	const completed = () => {
		setTimeout(() => {
			props.onComplete();
		}, 2000)
	}

	return (
		<Paper className={classes.clock}>
			<Typography variant="h4" className={classes.counter}>
				<Countdown 
					date={duration}
					renderer={renderer}
					onComplete={completed}
				/>
			</Typography>
		</Paper>
	)
}

export default CountdownClock;