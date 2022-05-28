import { Paper, Typography, IconButton } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { ReactComponent as BlueWhiteCheckmark } from '../../assets/newCheckMark.svg';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkKatex from 'rehype-katex';
import remarRehype from 'remark-rehype';

const useStyles = makeStyles(() => ({
	paperAnswer: (selected) => ({
		width: '95%',
		borderRadius: 38,
		backgroundColor: 'white',
		padding: 3,
		margin: 4,
		boxShadow: selected === true && '3px 5px rgba(0, 0, 0, 0.25)',
		transition: 'transform 0.15s ease-in-out',
		'&:hover': (selected) => ({
			transform: 'scale3d(1.05, 1.05, 1)',
			boxShadow: selected === false && '0px 5px rgba(0, 0, 0, 0.1)',
			backgroundColor: '#E4E4E4',
		}),
	}),
	buttonWrapper: {
		padding: 0,
		width: '100%',
		borderRadius: 38,
	},
	icon: {
		position: 'absolute',
		top: -5,
		right: -5,
	},
	answerText: {
		fontSize: 18,
		padding: 8,
		wordWrap: 'break-word',
	},
}));

const Answer = (props) => {
	const classes = useStyles(props.selected);

	const changeChosenAnswer = () => {
		// do something to change the answer
		props.changeAnswer(props.answer.id);
	};

	return (
		<IconButton
			className={classes.buttonWrapper}
			onClick={changeChosenAnswer}
			key={props.answer.id}
			size='large'
		>
			<Paper className={classes.paperAnswer}>
				<Typography className={classes.answerText} variant='h6'>
					<ReactMarkdown remarkPlugins={[remarkMath, remarRehype, remarkKatex]}>
						{props.answer.text}
					</ReactMarkdown>
				</Typography>
			</Paper>
			{props.selected && <BlueWhiteCheckmark className={classes.icon} />}
		</IconButton>
	);
};

export default Answer;
