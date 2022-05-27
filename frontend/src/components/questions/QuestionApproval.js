import React from 'react';
import { Grid, IconButton, Paper, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import { deleteQuestion, acceptQuestion } from '../../api';
import Question from '../questions/Question';

const useStyles = makeStyles(() => ({
	question: {
		width: '100%',
	},
	questionInfoLabel: {
		fontWeight: 'bold',
	},
}));

const QuestionApproval = ({ question, callBack }) => {
	const classes = useStyles();

	const accept = () => {
		acceptQuestion(question.id, () => {
			callBack(question);
		});
	};

	const remove = () => {
		deleteQuestion(question.id, () => {
			callBack(question);
		});
	};

	return (
		<Grid className={classes.question} container direction='row' alignItems='center'>
			<Grid item xs={1}>
				<IconButton onClick={remove} size='large'>
					<ClearIcon color='error' />
				</IconButton>
			</Grid>

			<Grid item xs='auto'>
				<Question question={question} preview={true} />
			</Grid>

			<Grid item xs={1}>
				<IconButton onClick={accept} size='large'>
					<CheckIcon color='primary' />
				</IconButton>
			</Grid>

			<Grid item xs={12} style={{ margin: '4rem' }} justifyContent='space-around'>
				{' '}
				{/* Information */}
				<Paper style={{ padding: '1rem' }}>
					<Grid container spacing={4}>
						<Grid item xs={3}>
							<Typography>
								Disciplina:{' '}
								<span className={classes.questionInfoLabel}>
									{question.subject}
								</span>
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Typography>
								Tema:{' '}
								<span className={classes.questionInfoLabel}>
									{question.subsubject}
								</span>
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Typography>
								Ano:{' '}
								<span className={classes.questionInfoLabel}>{question.year}</span>
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Typography>
								Fonte:{' '}
								<span className={classes.questionInfoLabel}>{question.source}</span>
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Typography>
								ID: <span className={classes.questionInfoLabel}>{question.id}</span>
							</Typography>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		</Grid>
	);
};

export default QuestionApproval;
