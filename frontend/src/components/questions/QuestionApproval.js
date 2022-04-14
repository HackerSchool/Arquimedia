import React from "react";
import {
	Grid,
	IconButton
} from "@mui/material"
import makeStyles from '@mui/styles/makeStyles';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
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
				<IconButton onClick={remove} size="large">
					<ClearIcon color="error"/>
				</IconButton>
			</Grid>

			<Grid item xs={10}>
				<Question question={question} preview={true}/>
			</Grid>

			<Grid item xs={1}>
				<IconButton onClick={accept} size="large">
					<CheckIcon color="primary"/>
				</IconButton>
			</Grid>
		</Grid>
    );
};

export default QuestionApproval;