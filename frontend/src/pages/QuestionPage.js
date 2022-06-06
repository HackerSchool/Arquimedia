import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import Question from '../components/questions/Question';
import { fetchQuestion } from '../api';
import theme from '../globalTheme';
import Box from '../components/box/Box';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(() => ({
	itemInfo: {
		fontWeight: 'normal',
	},
	itemInfoLabel: {
		fontWeight: 'bold',
	},
}));

export default function QuestionPage() {
	const classes = useStyles();
	const { id } = useParams();
	const [question, setQuestion] = useState(null);

	useEffect(() => {
		fetchQuestion(id, (res) => {
			setQuestion(res.data);
		});
	});

	if (question === null) return <></>;

	return (
		<Grid container spacing={4} alignItems='stretch'>
			{/* Question box */}
			<Grid item>
				<Question question={question} />
			</Grid>
			{/* Question info box */}
			<Grid item>
				<Box style={{ height: '95%' }}>
					<Typography variant='h4' fontWeight='bold' color={theme.palette.secondary.main}>
						Detalhes
					</Typography>
					<Typography variant='h6' className={classes.itemInfo}>
						<span className={classes.itemInfoLabel}>Disciplina:</span>{' '}
						{question.subject}
					</Typography>
					<Typography variant='h6' className={classes.itemInfo}>
						<span className={classes.itemInfoLabel}>Tema:</span> {question.subSubject}
					</Typography>
					<Typography variant='h6' className={classes.itemInfo}>
						<span className={classes.itemInfoLabel}>Ano:</span> {question.year}
					</Typography>
					<Typography variant='h6' className={classes.itemInfo}>
						<span className={classes.itemInfoLabel}>Fonte:</span> {question.source}
					</Typography>
					<Typography variant='h6' className={classes.itemInfo}>
						<span className={classes.itemInfoLabel}>Autor:</span>{' '}
					</Typography>
				</Box>
			</Grid>
			{/* Resolution */}
			<Grid item xs={12}></Grid>
			{/* Resources */}
			<Grid item xs={12}></Grid>
			{/* Comments */}
			<Grid item xs={12}></Grid>
		</Grid>
	);
}
