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
import AlertSnackBar from "../alerts/AlertSnackBar";
import NormalButton from "../buttons/NormalButton"
import globalTheme from "../../globalTheme";

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

const initialState = {
	subject: "Matematica",
	subSubject: "Geometria",
	text: "",
	year: 10,
	image: null,
	correct: "",
	wrong1: "",
	wrong2: "",
	wrong3: "",
}

const QuestionForm = () => {
	const [submitted, setSubmitted] = useState(false);
	const [
		{subject,
		subSubject,
		text,
		year,
		image,
		correct,
		wrong1,
		wrong2,
		wrong3}, setState
	] = useState(initialState)
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

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === 'image') 
    		setState((prevState) => ({ ...prevState, [name]: e.target.files[0] }));
    	else 
			setState((prevState) => ({ ...prevState, [name]: value }));
	}

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
				submitQuestionImage(data, res.data.id, () => {});				
			}

			setSubmitted(true)
			setState(initialState)
		})
	}

	return (
		<Grid container spacing={6} xs={12} align="center">
			{/* Question content */}
			<Grid item xs={6}>
				<TextField value={text} name="text" className={classes.contentInput} label="Texto" variant="outlined" multiline rows={5} onChange={handleChange}/>
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
				<Grid item xs={6}>
					<TextField value={correct} name='correct' onChange={handleChange} label="Resposta Correta" variant="outlined" />
				</Grid>
				<Grid item xs={6}>
					<TextField value={wrong1} name='wrong1' onChange={handleChange} label="Resposta incorreta" variant="outlined" />
				</Grid>
				<Grid item xs={6}>
					<TextField value={wrong2} name='wrong2' onChange={handleChange} label="Resposta incorreta" variant="outlined" />
				</Grid>
				<Grid item xs={6}>
					<TextField value={wrong3} name='wrong3' onChange={handleChange} label="Resposta incorreta" variant="outlined" />
				</Grid>
			</Grid>

			{/* Subject */}
			<Grid item xs={4}>
				<Select name='subject' value={subject} onChange={handleChange} label="Disciplina">
					<MenuItem value="Matematica">Matemática</MenuItem>
					<MenuItem value="Fisica">Fisica</MenuItem>
				</Select>
			</Grid>

			{/* Subsubject */}
			<Grid item xs={4}>
				<Select name='subSubject' value={subSubject} onChange={handleChange}>
					<MenuItem value="Imaginarios">Imaginários</MenuItem>
					<MenuItem value="Geometria">Geometria</MenuItem>
				</Select>
			</Grid>

			{/* Year */}
			<Grid item xs={4}>
				<Select name='year' value={year} onChange={handleChange}>
					<MenuItem value={10}>10</MenuItem>
					<MenuItem value={11}>11</MenuItem>
					<MenuItem value={12}>12</MenuItem>
				</Select>
			</Grid>

			{/* Image */}
			<Grid item xs={12}>
				<input name='image' type="file" label="Adicionar imagem" onChange={handleChange} accept ="image/*"/>
			</Grid>

			<Grid item xs={12}>
				<NormalButton text="Submeter" fontSize={30} backgroundColor={globalTheme.palette.primary.main} onClick={handleSubmition} />
			</Grid>

			<AlertSnackBar anchorOrigin={{ vertical:"bottom", horizontal:"right" }} open={submitted} text="Questão submetida com sucesso! Obrigado." type="success"/>

			<Grid item xs={12}>
				<Question question={question} preview={true}/>
			</Grid>
		</Grid>
	)
}

export default QuestionForm;