import React, { useEffect, useState } from 'react';
import { Grid, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { useParams } from 'react-router-dom';
import Question from '../components/questions/Question';
import { fetchQuestion, getUser, getProfile } from '../api';
import theme from '../globalTheme';
import Box from '../components/box/Box';
import makeStyles from '@mui/styles/makeStyles';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkKatex from 'rehype-katex';
import remarRehype from 'remark-rehype';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ArticleIcon from '@mui/icons-material/Article';
import useWindowDimensions from '../hooks/useWindowDimensions';
import responsiveWidth from '../hooks/responsiveWidth';
import { Chat } from '../components/chat/Chat';

const iconSelector = {
	video: <VideoLibraryIcon />,
	paper: <ArticleIcon />,
};

const useStyles = makeStyles(() => ({
	itemInfo: {
		fontWeight: 'normal',
	},
	itemInfoLabel: {
		fontWeight: 'bold',
	},
	resources: {
		border: '2px solid',
		borderRadius: 20,
		borderColor: theme.palette.grey.primary,
		boxShadow: '-6px 7px 16px rgba(0, 0, 0, 0.25)',
		padding: '1rem',
	},
	resource: {
		'&:hover': {
			color: theme.palette.secondary.main,
		},
		color: 'black',
		marginLeft: '1rem',
	},
	resourceGrid: {
		'&:hover': {
			color: theme.palette.secondary.main,
		},
	},
}));

export default function QuestionPage() {
	const classes = useStyles();
	const { id } = useParams();
	const [question, setQuestion] = useState(null);
	const [userID, setUserID] = useState(null);
	const [isUserMod, setIsUserMod] = useState(false);

	const windowArray = useWindowDimensions();

	useEffect(() => {
		fetchQuestion(id, (res) => {
			setQuestion(res.data);
		});
	}, []);

	useEffect(() => {
		getUser((res1) => {
			if (res1.data?.mod) {
				setIsUserMod(true);
			}

			getProfile(res1.data.profile, (res2) => {
				setUserID(res2.data.user.id);
			});
		});
	}, []);

	if (question === null) return <></>;
	return (
		<Grid container spacing={4} alignItems='stretch'>
			{/* Question box */}
			<Grid item xs={9}>
				<Question question={question} />
			</Grid>
			{/* Question info box */}
			<Grid item xs={3}>
				<Box style={{ height: '93%' }}>
					<Typography
						variant='h4'
						fontWeight='bold'
						color={theme.palette.secondary.main}
						style={{
							fontSize: responsiveWidth(windowArray, 15, 35, 0.017),
						}}
					>
						Detalhes
					</Typography>
					<Typography
						variant='h6'
						className={classes.itemInfo}
						style={{
							fontSize: responsiveWidth(windowArray, 10, 30, 0.012),
						}}
					>
						<span className={classes.itemInfoLabel}>Disciplina:</span>{' '}
						{question.subject}
					</Typography>
					<Typography
						variant='h6'
						className={classes.itemInfo}
						style={{
							fontSize: responsiveWidth(windowArray, 10, 30, 0.012),
						}}
					>
						<span className={classes.itemInfoLabel}>Tema:</span> {question.subsubject}
					</Typography>
					<Typography
						variant='h6'
						className={classes.itemInfo}
						style={{
							fontSize: responsiveWidth(windowArray, 10, 30, 0.012),
						}}
					>
						<span className={classes.itemInfoLabel}>Ano:</span> {question.year}
					</Typography>
					<Typography
						variant='h6'
						className={classes.itemInfo}
						style={{
							fontSize: responsiveWidth(windowArray, 10, 30, 0.012),
						}}
					>
						<span className={classes.itemInfoLabel}>Fonte:</span> {question.source}
					</Typography>
					<Typography
						variant='h6'
						className={classes.itemInfo}
						style={{
							fontSize: responsiveWidth(windowArray, 10, 30, 0.012),
						}}
					>
						<span className={classes.itemInfoLabel}>Autor:</span>{' '}
					</Typography>
				</Box>
			</Grid>
			{/* Resolution */}
			<Grid item xs={12}>
				<Box>
					<Typography
						variant='h4'
						fontWeight='bold'
						color={theme.palette.secondary.main}
						style={{
							fontSize: responsiveWidth(windowArray, 15, 35, 0.017),
						}}
					>
						Resolução
					</Typography>
					{question.resolution ? (
						<Typography
							variant='h6'
							fontWeight='normal'
							style={{
								fontSize: responsiveWidth(windowArray, 12, 20, 0.012),
							}}
						>
							<ReactMarkdown remarkPlugins={[remarkMath, remarRehype, remarkKatex]}>
								{question.resolution}
							</ReactMarkdown>
						</Typography>
					) : (
						<Typography
							style={{
								fontSize: responsiveWidth(windowArray, 12, 20, 0.012),
							}}
						>
							Ainda estamos a trabalhar na resolução desta pergunta...
						</Typography>
					)}
				</Box>
			</Grid>
			{/* Resources */}
			<Grid item xs={12}>
				<Accordion className={classes.resources} square>
					<AccordionSummary>
						<Typography
							variant='h4'
							fontWeight='bold'
							color={theme.palette.secondary.main}
							style={{
								fontSize: responsiveWidth(windowArray, 15, 35, 0.017),
							}}
						>
							+ Recursos
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						{question.resources.length > 0 ? (
							<>
								{question.resources.map((resource) => (
									<Grid
										container
										alignItems='center'
										key={classes.description}
										className={classes.resourceGrid}
									>
										{iconSelector[resource.type]}
										<Typography
											variant='h6'
											fontWeight='normal'
											key={resource.text}
											style={{
												fontSize: responsiveWidth(
													windowArray,
													12,
													20,
													0.012
												),
											}}
										>
											<a
												style={{
													textDecoration: 'none',
												}}
												className={classes.resource}
												href={resource.url}
												target='_blank'
												rel='noreferrer'
											>
												{resource.description}
											</a>
										</Typography>
									</Grid>
								))}
							</>
						) : (
							<Typography
								variant='h6'
								fontWeight='normal'
								style={{
									fontSize: responsiveWidth(windowArray, 12, 20, 0.012),
								}}
							>
								Ainda estamos à procura de recursos...
							</Typography>
						)}
					</AccordionDetails>
				</Accordion>
			</Grid>
			{/* Comments */}
			<Grid item xs={12}>
				<Box>
					<Grid container direction='column'>
						{/* List of Comments Area */}
						<Chat
							userID={userID}
							isUserMod={isUserMod}
							questionID={id}
							messageArray={question.comment}
						></Chat>
					</Grid>
				</Box>
			</Grid>
		</Grid>
	);
}
