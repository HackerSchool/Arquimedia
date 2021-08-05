import { useState, useEffect } from "react";
import {
	Typography,
	Grid,
	Button
} from "@material-ui/core";
import { examInfo } from "../api";
import Question from "../components/question/Question";


const ExamPage = (props) => {
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
			console.log("Para a q:" + question.id + " respondeu " + answers[i]);
		})
	}


	const callBack = (childData, index) => {
		// creates a copy of asnwers, modifies it and updates answers
		let newArray = Object.assign({}, answers);
		newArray[index] = childData;
		setAnswers(newArray);
		console.log("answers updated");
	}


	return (
		<Grid container align="center" spacing={4} xs={12}>
			{exam.questions.map((question, i) => (
				<Grid item xs={12} key={question.id}>
					<Question key={question.id} question={question} answer={i} callBack={callBack}/>
				</Grid>
			))}
			<Grid item xs={12}>
				<Button variant="contained" type="submit" onClick={handleClick}>Concluir</Button>
			</Grid>
		</Grid>
	)
}

export default ExamPage;