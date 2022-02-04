import React, { useEffect } from "react";
import {
	Typography,
	Grid,
	Paper,
} from "@material-ui/core";
import { useState } from "react";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ButtonBase from '@material-ui/core/ButtonBase';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import { makeStyles } from "@material-ui/core";
import QuestionImage from "./QuestionImage";
import Answer from "./Answers";

var Latex = require('react-latex');

const useStyles = makeStyles(theme => ({
	questionBox: {
		width: "70%",
		borderRadius: 20,
		boxShadow: "0px 4px 4px #9A9A9A",
		backgroundColor: "#F9F9F9"
	},

	answers: {
		backgroundColor: '#EB5757',
		width: "100%",
		borderRadius: 20,
	},

	number: {
		backgroundColor: '#EB5757',
		borderRadius: 90,
		color: '#FFFFFF',
		border: 20,
		padding: 5,
		borderColor: '#EB5757',
		position: 'relative',
		height: "2rem",
		top: "-1rem",
	},

	bold: {
		fontWeight: 600,
	},

	options: {
		padding: 10,
		fontWeight: 1,
	},
}))

const Question = (props) => {
	const classes = useStyles();
	const [selectedAnswer, setSelectedAnswer] = useState(props.selected)

	const handleAnswer = (newAnswer) => {
		setSelectedAnswer(newAnswer)
		props.callBack(newAnswer, props.answer);
	}

	return (
		<Paper className={classes.questionBox}>	
		
			<Grid container direction="row" justifyContent="flex-start" style={{margin: 0}} spacing={0}>

				<Grid item xs={8} justifyContent="center">
					{/* Question's number */}
					<Grid item xs={5}>
						<Paper className={classes.number}><Typography className={classes.bold} variant="h5"> Questão {props.answer + 1} </Typography></Paper>
					</Grid>

					{/* Question's text */}
					<Grid item xs={12} spacing={3}>
							<Typography variant="h5"><Latex>{props.question.text}</Latex></Typography>
					</Grid>

					{/* Question's image */}
					<Grid item xs={12} spacing={3}>
							<Paper className={classes.paper}><QuestionImage question={props.question} /></Paper>
					</Grid>
				</Grid>

				{/* Answers */}
				<Grid container item xs={4}> 
					<Paper className={classes.answers}>
						{props.question.answer.map(answer => {
								return (
									<Grid item className={classes.options}>
										<Answer selected={answer.id === selectedAnswer} answer={answer} changeAnswer={handleAnswer}/>
									</Grid>
								)
							})}
					</Paper>
				</Grid>
			</Grid>
      	
	</Paper>
	)
}


export default Question;