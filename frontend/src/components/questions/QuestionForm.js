import {
	Grid,
	TextField,
	Select,
	MenuItem,
	Button
} from "@material-ui/core"
import { useState } from "react";
import {
	submitQuestion,
	submitQuestionImage
} from "../../api";


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
				submitQuestionImage(data, res.data.id, (res) => console.log(res));				
			}
		})
	}

	return (
		<Grid container spacing={3} xs={12} align="center">
			<Grid item xs={12}>
				<TextField label="Texto" variant="outlined" multiline rows={5} onChange={handleText}/>
			</Grid>
			<Grid item xs={12}>
				<input type="file" label="Adicionar imagem" onChange={handleImage} accept ="image/*"/>
			</Grid>
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
			<Grid item xs={4}>
				<Select value={subject} onChange={handleSubjectChange} label="Disciplina">
					<MenuItem value="Matematica">Matemática</MenuItem>
					<MenuItem value="Fisica">Fisica</MenuItem>
				</Select>
			</Grid>
			<Grid item xs={4}>
				<Select value={subSubject} onChange={handleSubSubjectChange}>
					<MenuItem value="Imaginarios">Imaginários</MenuItem>
					<MenuItem value="Geometria">Geometria</MenuItem>
				</Select>
			</Grid>
			<Grid item xs={4}>
				<Select value={year} onChange={handleYear}>
					<MenuItem value={10}>10</MenuItem>
					<MenuItem value={11}>11</MenuItem>
					<MenuItem value={12}>12</MenuItem>
				</Select>
			</Grid>
			<Grid item xs={12}>
				<Button variant="contained" onClick={handleSubmition}>Submeter</Button>
			</Grid>
		</Grid>
	)
}

export default QuestionForm;