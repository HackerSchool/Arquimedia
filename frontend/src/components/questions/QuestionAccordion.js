import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
var Latex = require('react-latex');


const QuestionAccordion = ({question, failed}) => {

	let correctAnswer = question.answer.find(e => e.correct);

	return (
		<Accordion>
			<AccordionSummary expandIcon={<ExpandMoreIcon />} style={{
				backgroundColor: (failed ? "red" : "green"),
			}}>
				<Typography><Latex>{question.text}</Latex></Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Typography><Latex>{correctAnswer.text}</Latex></Typography>
			</AccordionDetails>
		</Accordion>
	)
}

export default QuestionAccordion;

