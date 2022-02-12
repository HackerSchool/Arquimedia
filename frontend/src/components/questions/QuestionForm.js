import React from "react";
import {
	Grid,
	TextField,
	Select,
	MenuItem,
	Button,
	makeStyles,
	Tooltip,
	Typography
} from "@material-ui/core"
import { useState } from "react";
import {
	submitQuestion,
	submitQuestionImage
} from "../../api";
import Question from '../questions/Question'
import InfoIcon from '@material-ui/icons/Info';
import Info from "@material-ui/icons/Info";

var Latex = require('react-latex');

const useStyles = makeStyles(theme => ({
	contentInput: {
		width: "30rem"
	},
	tooltipText: {
		textDecoration: "none",
		color: theme.palette.primary.main
	},
	tooltipKatex: {
		position: "absolute",
		rigth: "3rem"
	}
}))

const QuestionForm = () => {
	const [subject, setSubject] = useState("Matematica");
	const [subSubject, setSubSubject] = useState("Geometria");
	const [text, setText] = useState();
	const [year, setYear] = useState(10);
	const [image, setImage] = useState();
	const [correct, setCorrect] = useState();
	const [wrong1, setWrong1] = useState();
	const [wrong2, setWrong2] = useState();
	const [wrong3, setWrong3] = useState();
	const classes = useStyles()
	let question = {
		text: text,
		answer: [
			{
				text: correct,
				id: 1
			},
			{
				text: wrong1,
				id: 2
			},
			{
				text: wrong2,
				id: 3
			},
			{
				text: wrong3,
				id: 4
			},
		],
		image: image
	}

	const handleSubjectChange = (event) => setSubject(event.target.value);
	const handleSubSubjectChange = (event) => setSubSubject(event.target.value);
	const handleText = (event) => setText(event.target.value);
	const handleYear = (event) => setYear(event.target.value);
	const handleImage = (event) => setImage(event.target.files[0]);
	const handleCorrect = (event) => setCorrect(event.target.value);
	const handleWrong1 = (event) => setWrong1(event.target.value);
	const handleWrong2 = (event) => setWrong2(event.target.value);
	const handleWrong3 = (event) => setWrong3(event.target.value);


	const handleSubmition = () => {
		const body = {
			text: text,
			answers: [
				{
					text: correct,
					correct: true
				},
				{
					text: wrong1,
					correct: false
				},
				{
					text: wrong2,
					correct: false
				},
				{
					text: wrong3,
					correct: false
				}
			],
			subject: subject,
			subsubject: subSubject,
			year: year,
		}

		submitQuestion(body, (res) => {
			if (image) {
				let data = new FormData();
				data.append("file", image, image.name);
				submitQuestionImage(data, res.data.id, () => alert("Questão submetida"));				
			}
		})
	}

	return (
		<Grid container spacing={6} xs={12} align="center">
			{/* Question content */}
			<Grid item xs={6}>
				<TextField className={classes.contentInput} label="Texto" variant="outlined" multiline rows={5} onChange={handleText}/>
				<Tooltip
				className={classes.tooltipKatex}
				interactive
				title={
					<React.Fragment>
						<Typography variant="h6">Escreve equações matemáticas usando KaTeX!</Typography>
						<Typography>Começa por escrever a equação dentro de dois <b>$equação$</b></Typography>
						<Typography><b>Exemplo</b>: $x^2=4$ fica <Latex>$x^2=4$</Latex></Typography>
						<Typography>Descobre mais lendo a <b><a target="_blank" className={classes.tooltipText} href="https://katex.org/docs/supported.html">documentação</a></b></Typography>
					</React.Fragment>
				}
				
				>
					<InfoIcon />
				</Tooltip>
			</Grid>

			{/* Answers */}
			<Grid item xs={6} container>
				<Grid item xs={6} onChange={handleCorrect}>
					<TextField label="Resposta Correta" variant="outlined" />
				</Grid>
				<Grid item xs={6} onChange={handleWrong1}>
					<TextField label="Resposta incorreta" variant="outlined" />
				</Grid>
				<Grid item xs={6} onChange={handleWrong2}>
					<TextField label="Resposta incorreta" variant="outlined" />
				</Grid>
				<Grid item xs={6} onChange={handleWrong3}>
					<TextField label="Resposta incorreta" variant="outlined" />
				</Grid>
			</Grid>

			{/* Subject */}
			<Grid item xs={4}>
				<Select value={subject} onChange={handleSubjectChange} label="Disciplina">
					<MenuItem value="Matematica">Matemática</MenuItem>
					<MenuItem value="Fisica">Fisica</MenuItem>
				</Select>
			</Grid>

			{/* Subsubject */}
			<Grid item xs={4}>
				<Select value={subSubject} onChange={handleSubSubjectChange}>
					<MenuItem value="Imaginarios">Imaginários</MenuItem>
					<MenuItem value="Geometria">Geometria</MenuItem>
				</Select>
			</Grid>

			{/* Year */}
			<Grid item xs={4}>
				<Select value={year} onChange={handleYear}>
					<MenuItem value={10}>10</MenuItem>
					<MenuItem value={11}>11</MenuItem>
					<MenuItem value={12}>12</MenuItem>
				</Select>
			</Grid>

			{/* Image */}
			<Grid item xs={12}>
				<input type="file" label="Adicionar imagem" onChange={handleImage} accept ="image/*"/>
			</Grid>

			<Grid item xs={12}>
				<Button variant="contained" onClick={handleSubmition}>Submeter</Button>
			</Grid>

			<Grid item xs={12}>
				<Question question={question} preview={true}/>
			</Grid>
		</Grid>
	)
}

export default QuestionForm;