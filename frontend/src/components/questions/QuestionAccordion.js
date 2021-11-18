import React from "react";
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
	Button
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from "@material-ui/core";
import LaunchIcon from '@material-ui/icons/Launch';
var Latex = require('react-latex');

const useStyles = makeStyles(theme => ({
	root: {
		width: "60%"
	}
}))


const QuestionAccordion = ({question, failed}) => {
	const classes = useStyles();

	let correctAnswer = question.answer.find(e => e.correct);

	return (
		<Accordion className={classes.root}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />} style={{
				backgroundColor: (failed ? "#ff8c8c" : "#b4ff8c"),
			}}>
				<Typography><Latex>{question.text}</Latex></Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Typography><Latex>{correctAnswer.text}</Latex></Typography>
				<Button href={"/question/" + question.id}><LaunchIcon /></Button>
			</AccordionDetails>
		</Accordion>
	)
}

export default QuestionAccordion;

