import React from 'react';
import { Typography, Grid, Paper } from '@mui/material';
import { useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import QuestionImage from './QuestionImage';
import Answer from './Answers';

var Latex = require('react-latex');

const useStyles = makeStyles((theme) => ({
	questionBox: {
		width: '70%',
		borderRadius: 20,
		boxShadow: '0px 4px 4px #9A9A9A',
		backgroundColor: '#F9F9F9',
	},

	answers: {
		backgroundColor: '#EB5757',
		width: '100%',
		borderRadius: 20,
		justifyContent: 'center',
		display: 'flex',
		flexDirection: 'column',
	},

	number: {
		backgroundColor: '#EB5757',
		borderRadius: 90,
		color: '#FFFFFF',
		border: 20,
		padding: 5,
		borderColor: '#EB5757',
		position: 'relative',
		height: '2rem',
		top: '-1rem',
	},

	bold: {
		fontWeight: 600,
	},

	options: {
		padding: 10,
		fontWeight: 1,
	},

	questionText: {
		whiteSpace: 'pre-line',
	},
}));

const Question = (props) => {
	const classes = useStyles();
	const [selectedAnswer, setSelectedAnswer] = useState(props.selected);

	const handleAnswer = (newAnswer) => {
		setSelectedAnswer(newAnswer);
		if (props.preview) return;
		props.callBack(newAnswer, props.answer);
	};

	return (
		<Paper className={classes.questionBox}>
			<Grid
				container
				alignItems='stretch'
				direction='row'
				justifyContent='flex-start'
				style={{ margin: 0 }}
				spacing={0}
			>
				<Grid item xs={8} justifyContent='center'>
					{/* Question's number */}
					<Grid item xs={5}>
						<Paper className={classes.number}>
							<Typography className={classes.bold} variant='h5'>
								{' '}
								{props.preview ? 'Preview' : 'Questão ' + (props.answer + 1)}{' '}
							</Typography>
						</Paper>
					</Grid>

					{/* Question's text */}
					<Grid item xs={12} spacing={3}>
						<Typography variant='h5' className={classes.questionText}>
							<Latex>{props.question.text}</Latex>
						</Typography>
					</Grid>

					{/* Question's image */}
					{props.question.image && (
						<Grid item xs={12} spacing={3}>
							<QuestionImage preview={props.preview} question={props.question} />
						</Grid>
					)}
				</Grid>

				{/* Answers */}
				<Grid container item xs={4}>
					<Paper className={classes.answers} alignItems='center' direction='column'>
						{props.question.answer.map((answer) => {
							return (
								<Grid item className={classes.options}>
									<Answer
										preview={props.preview}
										selected={answer.id === selectedAnswer}
										answer={answer}
										changeAnswer={handleAnswer}
									/>
								</Grid>
							);
						})}
					</Paper>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default Question;
