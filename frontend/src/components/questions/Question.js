import React from "react";
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

var Latex = require('react-latex');

const useStyles = makeStyles(theme => ({
	questionBox: {
		width: "70%",
		padding: 4,
	},

	questions: {
		width: "100%",
		backgroundColor: '#EB5757',
		borderRadius: 10,
	},

	number: {
		backgroundColor: '#EB5757',
		borderRadius: 90,
		color: '#FFFFFF',
		border: 20,
		padding: 5,
		borderColor: '#EB5757',
	},

	bold: {
		fontWeight: 600,
	},

	options: {
		backgroundColor: '#EB5757',
		padding: 10,
		fontWeight: 1,

	}

}))

const Question = (props) => {
	const classes = useStyles();
	const [answer, setAnswer] = useState("")

	const handleAnswer = (event, newAnswer) => {
		setAnswer(newAnswer)
		props.callBack(newAnswer, props.answer);
	}

	return (
		<div>	
		
			<Grid container className={classes.questionBox}>

				<Grid item xs={8} justifyContent="center">
					<Grid item xs={5}>
						<Paper className={classes.number}><Typography className={classes.bold} variant="h5"> Questão ___ </Typography></Paper>
					</Grid>
				</Grid>
				
				<Grid container> 

					<Grid item xs={8} spacing={3}>
						<Grid item xs={12} spacing={3}>
							<Paper className={classes.paper}><Typography variant="h5"><Latex>{props.question.text}</Latex></Typography></Paper>
						</Grid>
						<Grid item xs={12} spacing={3}>
							<Paper className={classes.paper}><QuestionImage question={props.question} /></Paper>
						</Grid>
					</Grid>

					<Grid item xs={4} spacing={10}>

								<Grid container xs={12} className={classes.questions} justifyContent="center" direction={'column'}>

									<Grid item className={classes.options}>
										<Paper><Typography variant="h6"> Texto da Resposta 1 </Typography></Paper>
									</Grid>

									<Grid item className={classes.options}>
										<Paper><Typography variant="h6"> Texto da Resposta 2 </Typography></Paper>
									</Grid>

									<Grid item className={classes.options}>
										<Paper className={classes.paper}><Typography variant="h6"> Texto da Resposta 3 </Typography></Paper>
									</Grid>

									<Grid item className={classes.options}>
										<Paper className={classes.paper}><Typography variant="h6"> Texto da Resposta 4 </Typography></Paper>
									</Grid>

								</Grid>

						

					</Grid>

				</Grid>
			</Grid>
      	
	</div>
	)
}

export default Question;