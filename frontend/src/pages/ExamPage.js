import { useState, useEffect } from "react";
import {
	Typography,
	Grid,
	Button,
	Fab
} from "@material-ui/core";
import { examInfo } from "../api";
import Question from "../components/question/Question";
import { submitExam } from "../api";
import CountdownClock from "../components/countdownClock/CountdownClock";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	timer: {
		position: "fixed",
		bottom: 0,
		rigth: 0,
		padding: "10px"
	}
}))

const ExamPage = (props) => {
	const classes = useStyles();
	const [exam, setExam] = useState({questions: []});
	const [loading, setLoading] = useState(true);
	const [answers, setAnswers] = useState();

	
	useEffect(() => {
		examInfo(props.match.params.id, (res) => {
			setExam(res.data);
			setLoading(false);
			setAnswers(Array(exam.questions.length).fill(0));
		})
	}, [props.match.params.id, exam.questions.length])

	if (loading) return (<Typography>Loading</Typography>)

	const handleClick = () => {
		exam.questions.forEach((question, i) => {
		})
		let body = {};

		exam.questions.forEach((question, i) => {
			body[question.id] = answers[i];
		})

		submitExam(exam.id, body, (res) => window.location.href = "/resultado/" + res.data.id)
	}


	const callBack = (childData, index) => {
		// creates a copy of asnwers, modifies it and updates answers
		let newArray = Object.assign({}, answers);
		newArray[index] = childData;
		setAnswers(newArray);
	}


	return (
		<div>
			<Grid container align="center" spacing={4} xs={12}>
				<Grid item xs={12}>
					<div className={classes.timer}>
						<CountdownClock duration={exam.questions.length * 60} onComplete={handleClick}/>
					</div>
				</Grid>
				{exam.questions.map((question, i) => (
					<Grid item xs={12} key={question.id}>
						<Question key={question.id} question={question} answer={i} callBack={callBack}/>
					</Grid>
				))}
				<Grid item xs={12}>
					<Button variant="contained" type="submit" onClick={handleClick}>Concluir</Button>
				</Grid>
			</Grid>
		</div>
	)
}

export default ExamPage;