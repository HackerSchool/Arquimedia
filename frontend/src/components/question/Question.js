import {
	Typography,
	Grid,
	Paper,
} from "@material-ui/core";
import { useState } from "react";
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import { makeStyles } from "@material-ui/core";
var Latex = require('react-latex');

const useStyles = makeStyles(theme => ({
	question: {
		width: "30%",
		padding: 0
	}
}))

const Question = (props) => {
	const classes = useStyles();
	const [answer, setAnswer] = useState("")

	const handleAnswer = (event, newAnswer) => {
		setAnswer(newAnswer)
	}

	return (
		<Paper className={classes.question}>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Typography variant="h5"><Latex>{props.question.text}</Latex></Typography>
				</Grid>

				<Grid item xs={12}>
					<ToggleButtonGroup exclusive value={answer} onChange={handleAnswer}>
						{props.question.answer.map((answer) => (
								<ToggleButton value={answer.id} key={answer.id}>
									{answer.text}
								</ToggleButton>
						))}
					</ToggleButtonGroup>
				</Grid>
			</Grid>
		</Paper>
	)
}

export default Question;