import React from "react";
import QuestionApproval from "../components/questions/QuestionApproval";
import {
	useState,
	useEffect,
} from "react";
import { getSubmittedQuestions } from "../api";
import {
	Grid
} from "@mui/material";
import Loading from "../components/loading/Loading";

const SubmittedQuestions = () => {
	const [questions, setQuestions] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getSubmittedQuestions((res) => {
			setQuestions(res.data);
			setLoading(false)
		})
	}, [])


	const updateQuestion = (question) => {
		setQuestions(questions.filter(function(i) {
			return i !== question
			}));
	}


	if (loading) return (<Loading />)

	return (
		<Grid container spacing={4} align="center" xs={12}>
			{questions.map((question) => (
				<Grid item xs={12}>
					<QuestionApproval question={question} callBack={updateQuestion}/>
				</Grid>
			))}
		</Grid>
	)
}

export default SubmittedQuestions;