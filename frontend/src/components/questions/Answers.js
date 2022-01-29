import {
	Paper,
	makeStyles,
	Typography,
	IconButton
} from '@material-ui/core';
import React from 'react';
var Latex = require('react-latex');

const useStyles = makeStyles(theme => ({
	paperAnswer: {
		borderRadius: 38,
		width: "100%"
	},
	buttonWrapper: {
		width: "80%",
		borderRadius: 38,
		"&:hover": {
			backgroundColor: "#ff6e6e",
		}
	}
}))

const Answer = (props) => {
	const classes = useStyles();

	const changeChosenAnswer = () => {
		// do something to change the answer
	}

    return (
		<IconButton className={classes.buttonWrapper} onClick={changeChosenAnswer}>
			<Paper className={classes.paperAnswer}><Typography variant="h6"><Latex>{props.answer.text}</Latex></Typography></Paper>
		</IconButton>
    )
}

export default Answer;
