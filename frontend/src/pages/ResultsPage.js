import { useEffect, useState } from "react";
import { examInfo } from "../api";
import Loading from "../components/loading/Loading";
import {
	Button,
	Grid,
	Typography,
} from "@material-ui/core";
import QuestionAccordionGroup from "../components/questions/QuestionAccordionGroup";


const ResultsPage = (props) => {
	const [loading, setLoading] = useState(true);
	const [exam, setExam] = useState();

	useEffect(() => {
		examInfo(props.match.params.id, (res) => {
			setExam(res.data);
			setLoading(false);
		})
	}, [props.match.params.id])

	if (loading) return (<Loading />)

	return (
		<Grid container align="center" spacing={4} xs={12}>
			<Grid item xs={12}>
				<Typography variant="h2">Resultados</Typography>
			</Grid>
			<Grid item xs={6}>
				<Typography variant="h6">Erradas: {exam.failed.length}</Typography>
			</Grid>
			<Grid item xs={6}>
				<Typography variant="h6">Corretas: {exam.correct.length}</Typography>
			</Grid>
			<Grid item xs={6}>
				<Typography variant="h6">Nota: {exam.score}</Typography>
			</Grid>
			<Grid item xs={12}>
				<Typography variant="h6">Perguntas:</Typography>
				<QuestionAccordionGroup exam={exam} />
			</Grid>
			<Grid item xs={6}>
				<Button variant="contained" href="/exames">Gerar outro exame</Button>
			</Grid>
			<Grid item xs={6}>
				<Button variant="contained" href="/">Sair</Button>
			</Grid>
		</Grid>
	);
};

export default ResultsPage;