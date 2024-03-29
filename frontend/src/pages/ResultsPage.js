import React from 'react';
import { useEffect, useState } from 'react';
import { examInfo } from '../api';
import Loading from '../components/loading/Loading';
import { Grid, Typography, Paper, Divider } from '@mui/material';
import QuestionAccordionGroup from '../components/questions/QuestionAccordionGroup';
import theme from '../globalTheme';
import makeStyles from '@mui/styles/makeStyles/';
import NormalButton from '../components/buttons/NormalButton';

const useStyles = makeStyles(() => ({
	paper: {
		width: '100%',
		borderRadius: 40,
		border: '3px solid #D9D9D9',
		boxShadow: '-6px 4px 6px rgba(0, 0, 0, 0.25)',
		margin: '0rem 0rem 1rem 0rem',
		padding: '2rem 0rem',
	},
	resultInfo: {
		width: '100%',
		margin: '4rem 1rem',
		padding: '1rem',
		borderRadius: 40,
	},
	divider: {
		width: '85%',
	},
}));

const ResultsPage = (props) => {
	const classes = useStyles();
	const [loading, setLoading] = useState(true);
	const [exam, setExam] = useState();

	useEffect(() => {
		examInfo(props.match.params.id, (res) => {
			setExam(res.data);
			setLoading(false);
		});
	}, [props.match.params.id]);

	if (loading) return <Loading />;

	return (
		<Grid container direction='row' justifyContent='center' alignItems='center'>
			{' '}
			<Grid container direction='row' justifyContent='center' alignItems='center' xs={9}>
				<Paper theme={theme} className={classes.paper}>
					<Grid container align='center' spacing={2} xs={12}>
						<Grid item xs={12}>
							<Typography variant='h2'>Resultados</Typography>
						</Grid>
						<Grid item xs={12}>
							<Divider
								className={classes.divider}
								orientation='horizontal'
								flexItem
							></Divider>
						</Grid>
						<Grid className={classes.resultInfo} container xs={12}>
							<Grid item xs={4}>
								<Typography style={{ color: 'RGB(22, 198, 12)' }} variant='h4'>
									{' '}
									✅ Corretas: {exam.correct.length}
								</Typography>
							</Grid>
							<Grid item xs={4}>
								<Typography variant='h4'> 🏆 Nota: {exam.score} / 200</Typography>
							</Grid>
							<Grid item xs={4}>
								<Typography style={{ color: 'RGB(237, 57, 22)' }} variant='h4'>
									{' '}
									❌ Erradas: {exam.failed.length}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid
						container
						direction='row'
						justifyContent='center'
						align='center'
						spacing={2}
						xs={12}
					>
						<Grid item xs={12}>
							<Typography variant='h6'>Perguntas:</Typography>
							<QuestionAccordionGroup exam={exam} />
						</Grid>
						<Grid item xs={6}>
							<NormalButton
								fontSize={20}
								text='Gerar outro exame'
								variant='contained'
								href='/exames'
							></NormalButton>
						</Grid>
						<Grid item xs={6}>
							<NormalButton
								fontSize={20}
								text='Sair'
								variant='contained'
								href='/'
							></NormalButton>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		</Grid>
	);
};

export default ResultsPage;
