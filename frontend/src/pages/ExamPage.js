import { useState, useEffect } from "react";
import {
	Typography,
	Grid
} from "@material-ui/core";
import { examInfo } from "../api";
import Question from "../components/question/Question";


const ExamPage = (props) => {
	const [exam, setExam] = useState({questions: []});
	const [loading, setLoading] = useState(true);
	
	useEffect(() => {
		examInfo(props.match.params.id, (res) => {
			setExam(res.data);
			setLoading(false);
		})
	}, [props.match.params.id])

	if (loading) return (<Typography>Loading</Typography>)

	return (
		<Grid container align="center" spacing={4} xs={12}>
			{exam.questions.map(question => (
				<Grid item xs={12} key={question.id}>
					<Question key={question.id} question={question}/>
				</Grid>
			))}
		</Grid>
	)
}

export default ExamPage;