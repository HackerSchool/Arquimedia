import {
	Grid,
	Typography,
	Paper,
	IconButton
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
var Latex = require('react-latex');

const useStyles = makeStyles(theme => ({
	question: {
		width: "30%",
		padding: 0
	}
}))

const QuestionApproval = ({question}) => {
	const classes = useStyles();

	return (
		<Paper className={classes.question}>
			<Grid container spacing={4}>
				<Grid item xs={12}>
					<Typography variant="h5"><Latex>{question.text}</Latex></Typography>
				</Grid>
				<Grid item xs={4}>
					<IconButton>
						<ClearIcon color="error"/>
					</IconButton>
				</Grid>
				<Grid item xs={4}>
					<img src={question.image} style={{width: "80%"}}/>
				</Grid>
				<Grid item xs={4}>
				<IconButton>
						<CheckIcon color="primary"/>
					</IconButton>
				</Grid>
				{question.answer.map((answer) => (
					<Grid item xs={6}>
						<Typography variant="body"><Latex>{answer.text}</Latex></Typography>
					</Grid>
				))}
			</Grid>
		</Paper>
	)
};

export default QuestionApproval;