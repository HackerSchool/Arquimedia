import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import makeStyles from '@mui/styles/makeStyles';
import LaunchIcon from '@mui/icons-material/Launch';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkKatex from 'rehype-katex';
import remarRehype from 'remark-rehype';

const useStyles = makeStyles(() => ({
	rootAccordion: {
		width: '60%',
		borderRadius: 40,
		margin: '0rem 0rem 1rem 0rem',
		boxShadow: '3px 4px 6px rgba(0, 0, 0, 0.25)',
	},
	summaryAccordion: {
		borderRadius: 40,
	},
	questionText: {
		whiteSpace: 'pre-line',
		textAlign: 'justify',
		textJustify: 'inter-word',
		wordWrap: 'break-word',
	},
}));

const QuestionAccordion = ({ question, failed }) => {
	const classes = useStyles();

	let correctAnswer = question.answer.find((e) => e.correct);

	return (
		<Accordion
			sx={{
				'&:before': {
					display: 'none',
				},
			}}
			className={classes.rootAccordion}
			square
		>
			<AccordionSummary
				className={classes.summaryAccordion}
				expandIcon={<ExpandMoreIcon />}
				sx={{
					backgroundColor: failed ? '#ff8c8c' : '#b4ff8c',
					'&:hover': {
						backgroundColor: failed ? '#FFBABA' : '#DCFFC9',
					},
				}}
			>
				<Typography className={classes.questionText}>
					<ReactMarkdown remarkPlugins={[remarkMath, remarRehype, remarkKatex]}>
						{question.text}
					</ReactMarkdown>
				</Typography>
			</AccordionSummary>
			<AccordionDetails className={classes.detailAccordion}>
				<Typography>
					<ReactMarkdown remarkPlugins={[remarkMath, remarRehype, remarkKatex]}>
						{correctAnswer.text}
					</ReactMarkdown>
				</Typography>
				<Button href={'/question/' + question.id}>
					<LaunchIcon />
				</Button>
			</AccordionDetails>
		</Accordion>
	);
};

export default QuestionAccordion;
