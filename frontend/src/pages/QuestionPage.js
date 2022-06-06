import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import Question from '../components/questions/Question';
import { fetchQuestion } from '../api';

export default function QuestionPage() {
	const { id } = useParams();
	const [question, setQuestion] = useState(null);

	useEffect(() => {
		fetchQuestion(id, (res) => {
			setQuestion(res.data);
		});
	});

	if (question === null) return <></>;

	return (
		<Grid container>
			{/* Question box */}
			<Grid item>
				<Question question={question} />
			</Grid>
			{/* Question info box */}
			<Grid item></Grid>
			{/* Resolution */}
			<Grid item xs={12}></Grid>
			{/* Resources */}
			<Grid item xs={12}></Grid>
			{/* Comments */}
			<Grid item xs={12}></Grid>
		</Grid>
	);
}
