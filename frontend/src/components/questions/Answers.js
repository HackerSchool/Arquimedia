import {
	Paper,
	makeStyles,
	Typography,
	IconButton
} from '@material-ui/core';
import React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

var Latex = require('react-latex');

const useStyles = makeStyles(theme => ({
	paperAnswer:{
		width: "100%",
		borderRadius: 38,
	},
	buttonWrapper: selected => ({
		padding: 0,
		width: "80%",
		borderRadius: 38,
		boxShadow: (selected && "3px 6px 0px rgba(0, 0, 0, 0.25"),
		"&:hover": {
			backgroundColor: "#ff6e6e",
		}
	}),
	icon: {
		position: 'absolute',
		top: -10,
		right: -10,
		color: "#000"
	}
}))

const Answer = (props) => {
	const classes = useStyles(props.selected);

	const changeChosenAnswer = (event) => {
		// do something to change the answer
		props.changeAnswer(props.answer.id)
	}

    return (
		<IconButton className={classes.buttonWrapper} onClick={changeChosenAnswer} key={props.answer.id}>
			<Paper className={classes.paperAnswer}><Typography variant="h6"><Latex>{props.answer.text}</Latex></Typography></Paper>
			{props.selected && (
				<CheckCircleIcon className={classes.icon}/>
			)}
		</IconButton>
    )
}

export default Answer;
