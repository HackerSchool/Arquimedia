import React from "react";
import {
	Grid,
	IconButton
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import {
	deleteQuestion,
	acceptQuestion
} from "../../api";
import Question from "../questions/Question"

const useStyles = makeStyles(theme => ({
	question: {
		width: "100%",
	}
}))

const QuestionApproval = ({question, callBack}) => {
	const classes = useStyles();

	const accept = () => {
		acceptQuestion(question.id, () => {
			callBack(question);
		})
	};


	const remove = () => {
		deleteQuestion(question.id, () => {
			callBack(question);
		})
	};

	return (
		<Grid className={classes.question} container direction="row" alignItems="center">
			<Grid item xs={1}>
				<IconButton onClick={remove}>
					<ClearIcon color="error"/>
				</IconButton>
			</Grid>

			<Grid item xs={10}>
				<Question question={question} preview={true}/>
			</Grid>

			<Grid item xs={1}>
				<IconButton onClick={accept}>
					<CheckIcon color="primary"/>
				</IconButton>
			</Grid>
		</Grid>
	)
};

export default QuestionApproval;