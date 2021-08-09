import { useState, useEffect, useRef } from "react";
import {
	Typography,
	Grid,
} from "@material-ui/core";
import { examInfo } from "../api";
import CountdownClock from "../components/countdownClock/CountdownClock";
import { makeStyles } from "@material-ui/core";
import QuestionsGroup from "../components/questions/QuestionsGroup";


const useStyles = makeStyles(theme => ({
	timer: {
		position: "fixed",
		bottom: 0,
		rigth: 0,
		padding: "10px"
	}
}))

const ExamPage = (props) => {
	const childRef = useRef();
	const classes = useStyles();
	const [exam, setExam] = useState({questions: []});
	const [loading, setLoading] = useState(true);
	
	useEffect(() => {
		examInfo(props.match.params.id, (res) => {
			setExam(res.data);
			setLoading(false);
		})
		
	}, [props.match.params.id, exam.questions.length])

	const onComplete = () => {
		childRef.current.submit();
	}

	if (loading) return (<Typography>Loading</Typography>)

	return (
		<div>
			<Grid container align="center" spacing={4} xs={12}>
				<Grid item xs={12}>
					<div className={classes.timer}>
						<CountdownClock duration={exam.questions.length * 60} onComplete={onComplete}/>
					</div>
				</Grid>
				<Grid item xs={12}>
					<QuestionsGroup exam={exam} ref={childRef}/>
				</Grid>
			</Grid>
		</div>
	)
}

export default ExamPage;