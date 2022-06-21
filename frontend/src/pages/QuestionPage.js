/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
	Grid,
	Typography,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	TextField,
	IconButton,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import Question from '../components/questions/Question';
import {
	fetchQuestion,
	getUser,
	createCommentAPI,
	getProfile,
	deleteCommentAPI,
	upvoteAPI,
	downvoteAPI,
	hasUpvotedAPI,
	hasDownvotedAPI,
	removeUpvoteAPI,
	removeDownvoteAPI,
} from '../api';
import theme from '../globalTheme';
import Box from '../components/box/Box';
import AvatarUser from '../components/avatar/AvatarUser';
import makeStyles from '@mui/styles/makeStyles';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkKatex from 'rehype-katex';
import remarRehype from 'remark-rehype';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ArticleIcon from '@mui/icons-material/Article';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

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
	const [commentText, setCommentText] = useState('');
	const [userID, setUserID] = useState(null);
	useEffect(() => {
		fetchQuestion(id, (res) => {
			setQuestion(res.data);
		});
	}, []);

	useEffect(() => {
		getUser((res1) => {
			getProfile(res1.data.profile, (res2) => {
				setUserID(res2.data.user.id);
			});
		});
	}, []);

	const handleComment = (e) => {
		setCommentText(e.target.value);
	};

	const handleCommentSubmition = () => {
		const body = {
			content: commentText,
			author: userID,
			question: id,
		};

		createCommentAPI(body, (res) => {
			console.log(res.data);
		});
	};
	const handleCommentDelete = (commentID) => {
		deleteCommentAPI(commentID, (res) => {
			console.log(res.data);
		});
	};
	// TODO: Handle what happens when the user wants to remove its vote with else statemnet, and dop the itteration
	const handleCommentUpvote = (commentID) => {
		if (
			!hasUpvotedAPI(commentID, (res) => {
				console.log(res.data);
			})
		) {
			upvoteAPI(commentID, (res) => {
				console.log(res.data);
			});
		} else {
			removeUpvoteAPI(commentID, (res) => {
				console.log(res.data);
			});
		}
	};
	const handleCommentDownvote = (commentID) => {
		if (
			!hasDownvotedAPI(commentID, (res) => {
				console.log(res.data);
			})
		) {
			downvoteAPI(commentID, (res) => {
				console.log(res.data);
			});
		} else {
			removeDownvoteAPI(commentID, (res) => {
				console.log(res.data);
			});
		}
	};
	if (question === null) return <></>;
	return (
		<Grid container spacing={4} alignItems='stretch'>
			{/* Question box */}
			<Grid item>
				<Question question={question} />
			</Grid>
			{/* Question info box */}
			<Grid item>
				<Box style={{ height: '95%', width: '95%' }}>
					<Typography variant='h4' fontWeight='bold' color={theme.palette.secondary.main}>
						Detalhes
					</Typography>
					<Typography variant='h6' className={classes.itemInfo}>
						<span className={classes.itemInfoLabel}>Disciplina:</span>{' '}
						{question.subject}
					</Typography>
					<Typography variant='h6' className={classes.itemInfo}>
						<span className={classes.itemInfoLabel}>Tema:</span> {question.subSubject}
					</Typography>
					<Typography variant='h6' className={classes.itemInfo}>
						<span className={classes.itemInfoLabel}>Ano:</span> {question.year}
					</Typography>
					<Typography variant='h6' className={classes.itemInfo}>
						<span className={classes.itemInfoLabel}>Fonte:</span> {question.source}
					</Typography>
					<Typography variant='h6' className={classes.itemInfo}>
						<span className={classes.itemInfoLabel}>Autor:</span>{' '}
					</Typography>
				</Box>
			</Grid>
			{/* Resolution */}
			<Grid item xs={12}>
				<Box>
					<Typography variant='h4' fontWeight='bold' color={theme.palette.secondary.main}>
						Resolução
					</Typography>
					{question.resolution ? (
						<Typography variant='h6' fontWeight='normal'>
							<ReactMarkdown remarkPlugins={[remarkMath, remarRehype, remarkKatex]}>
								{question.resolution}
							</ReactMarkdown>
						</Typography>
					) : (
						<Typography>
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
							<Typography variant='h6' fontWeight='normal'>
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
						{question.comment.map((comment) => (
							<Grid container key={comment.id}>
								<Grid container xs={11}>
									{/* Comment Area */}
									<Grid item>
										{' '}
										{/* User Photo*/}
										<AvatarUser user={comment.author} />
									</Grid>
									<Grid container direction='column' xs={9}>
										<Grid item xs={2}>
											{' '}
											{/* Username*/}
											<Typography>{comment.author.username}</Typography>
										</Grid>
										<Grid item xs={10}>
											{' '}
											{/* Comment content*/}{' '}
											<Box>
												<Typography>{comment.content}</Typography>
											</Box>
										</Grid>
									</Grid>
								</Grid>
								<Grid container direction='column' xs={0.5}>
									{/* Upvotes Area */}
									<Grid item xs={6}>
										<IconButton onClick={handleCommentUpvote(comment.id)}>
											<PhotoCamera />
										</IconButton>
									</Grid>
									<Grid item xs={6}>
										{' '}
										<IconButton onClick={handleCommentDownvote(comment.id)}>
											<PhotoCamera />
										</IconButton>
									</Grid>
								</Grid>
								<Grid container direction='column' xs={0.5}>
									{/* Delete Area */}
									<Grid item xs={12}>
										<IconButton onClick={handleCommentDelete(comment.id)}>
											<PhotoCamera />
										</IconButton>
									</Grid>
								</Grid>
							</Grid>
						))}
						{/* Reply Area */}
						<Grid container>
							<Grid item xs={11}>
								{' '}
								<TextField
									value={commentText}
									name='commentText'
									label='Escreve aqui o teu comentário'
									variant='outlined'
									rows={5}
									onChange={handleComment}
								/>
							</Grid>
							<Grid item xs={1}>
								{' '}
								<IconButton onClick={handleCommentSubmition}>
									<PhotoCamera />
								</IconButton>
							</Grid>
						</Grid>
					</Grid>
				</Box>
			</Grid>
		</Grid>
	);
}
