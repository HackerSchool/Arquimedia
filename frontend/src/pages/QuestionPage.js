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
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { ReactComponent as DeleteIcon } from '../assets/deleteComment.svg';
import { ReactComponent as UpvoteIcon } from '../assets/upvote.svg';
import { ReactComponent as DownvoteIcon } from '../assets/downvote.svg';
import { ReactComponent as UpvoteFilledIcon } from '../assets/upvoteFilled.svg';
import { ReactComponent as DownvoteFilledIcon } from '../assets/downvoteFilled.svg';
import useWindowDimensions from '../hooks/useWindowDimensions';
import responsiveWidth from '../hooks/responsiveWidth';

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
	author: {
		color: '#BEBEBE',
		fontWeight: 700,
		fontSize: 18,
		marginLeft: '0.5rem',
	},
	voteCounter: {
		fontWeight: 600,
		fontSize: 18,
	},
}));

export default function QuestionPage() {
	const classes = useStyles();
	const { id } = useParams();
	const [question, setQuestion] = useState(null);
	const [commentText, setCommentText] = useState('');
	const [userID, setUserID] = useState(null);
	const [hasUpvoted, setHasUpvoted] = useState(false);
	const [hasDownvoted, setHasDownvoted] = useState(false);
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

	const handleCommentUpvote = (commentID) => {
		if (
			!hasUpvotedAPI(commentID, (res) => {
				console.log(res.data);
			})
		) {
			upvoteAPI(commentID, (res) => {
				console.log(res.data);
				setHasUpvoted(true);
			});
		} else {
			removeUpvoteAPI(commentID, (res) => {
				console.log(res.data);
				setHasUpvoted(false);
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
				setHasDownvoted(true);
			});
		} else {
			removeDownvoteAPI(commentID, (res) => {
				console.log(res.data);
				setHasDownvoted(false);
			});
		}
	};
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
						<span className={classes.itemInfoLabel}>Tema:</span> {question.subSubject}
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
						{question.comment.map((comment) => (
							<Grid container key={comment.id}>
								{/* Comment Area */}
								<Grid item xs={1}>
									{' '}
									{/* User Photo*/}
									<AvatarUser user={comment.author} />
								</Grid>
								<Grid
									container
									direction='column'
									xs={11}
									justifyContent='center'
									alignItems='flex-start'
								>
									<Grid item xs={1}>
										{' '}
										{/* Username*/}
										<Typography
											className={classes.author}
											style={{
												fontSize: responsiveWidth(
													windowArray,
													15,
													20,
													0.012
												),
											}}
										>
											{comment.author.username}
										</Typography>
									</Grid>
									<Grid container direction='row' alignItems='center'>
										<Grid item xs={11}>
											{' '}
											{/* Comment content*/}{' '}
											<Box>
												<Typography
													style={{
														fontSize: responsiveWidth(
															windowArray,
															12,
															20,
															0.012
														),
													}}
												>
													{comment.content}
												</Typography>
											</Box>
										</Grid>
										<Grid
											container
											direction='column'
											justifyContent='center'
											alignItems='center'
											xs={0.5}
										>
											{/* Upvotes Area */}
											<Grid item xs={1}>
												<IconButton
													onClick={handleCommentUpvote(comment.id)}
												>
													{hasUpvoted ? (
														<UpvoteFilledIcon
															style={{
																height: responsiveWidth(
																	windowArray,
																	22,
																	50,
																	0.012
																),
															}}
														/>
													) : (
														<UpvoteIcon
															style={{
																height: responsiveWidth(
																	windowArray,
																	22,
																	50,
																	0.012
																),
															}}
														/>
													)}
												</IconButton>
											</Grid>
											<Grid item xs={1}>
												<Typography
													variant='h6'
													className={classes.voteCounter}
													style={{
														fontSize: responsiveWidth(
															windowArray,
															12,
															20,
															0.012
														),
													}}
												>
													{comment.votes}
												</Typography>
											</Grid>
											<Grid item xs={1}>
												{' '}
												<IconButton
													onClick={handleCommentDownvote(comment.id)}
												>
													{hasDownvoted ? (
														<DownvoteFilledIcon
															style={{
																height: responsiveWidth(
																	windowArray,
																	22,
																	50,
																	0.012
																),
															}}
														/>
													) : (
														<DownvoteIcon
															style={{
																height: responsiveWidth(
																	windowArray,
																	22,
																	50,
																	0.012
																),
															}}
														/>
													)}
												</IconButton>
											</Grid>
										</Grid>
										<Grid
											container
											direction='column'
											justifyContent='center'
											alignItems='center'
											xs={0.5}
										>
											{/* Delete Area */}
											<Grid item xs={3}>
												{userID === comment.author.id || isUserMod ? (
													<IconButton
														onClick={handleCommentDelete(comment.id)}
													>
														<DeleteIcon
															style={{
																height: responsiveWidth(
																	windowArray,
																	18,
																	50,
																	0.015
																),
															}}
														/>
													</IconButton>
												) : (
													<></>
												)}
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						))}
						{/*Dummy Comment*/}
						<Grid container>
							{/* Comment Area */}
							<Grid item xs={1}></Grid>
							<Grid
								container
								direction='column'
								xs={11}
								justifyContent='center'
								alignItems='flex-start'
							>
								<Grid item xs={1}>
									{' '}
									{/* Username*/}
									<Typography
										className={classes.author}
										style={{
											fontSize: responsiveWidth(windowArray, 15, 20, 0.012),
										}}
									>
										Jerónimo
									</Typography>
								</Grid>
								<Grid container direction='row' alignItems='center'>
									<Grid item xs={11}>
										{' '}
										{/* Comment content*/}{' '}
										<Box>
											<Typography
												style={{
													fontSize: responsiveWidth(
														windowArray,
														12,
														20,
														0.012
													),
												}}
											>
												consectetur adipiscing elit, sed do eiusmod tempor
												incididunt ut labore et dolore magna aliqua. Ut enim
												ad minim veniam, quis nostrud exercitation ullamco
												laboris
											</Typography>
										</Box>
									</Grid>
									<Grid
										container
										direction='column'
										justifyContent='center'
										alignItems='center'
										xs={0.5}
									>
										{/* Upvotes Area */}
										<Grid item xs={1}>
											<IconButton onClick={handleCommentUpvote()}>
												{hasUpvoted ? (
													<UpvoteFilledIcon
														style={{
															height: responsiveWidth(
																windowArray,
																22,
																50,
																0.012
															),
														}}
													/>
												) : (
													<UpvoteIcon
														style={{
															height: responsiveWidth(
																windowArray,
																22,
																50,
																0.012
															),
														}}
													/>
												)}
											</IconButton>
										</Grid>
										<Grid item xs={1}>
											<Typography
												variant='h6'
												className={classes.voteCounter}
												style={{
													fontSize: responsiveWidth(
														windowArray,
														12,
														20,
														0.012
													),
												}}
											>
												1
											</Typography>
										</Grid>
										<Grid item xs={1}>
											{' '}
											<IconButton onClick={handleCommentDownvote()}>
												{hasDownvoted ? (
													<DownvoteFilledIcon
														style={{
															height: responsiveWidth(
																windowArray,
																22,
																50,
																0.012
															),
														}}
													/>
												) : (
													<DownvoteIcon
														style={{
															height: responsiveWidth(
																windowArray,
																22,
																50,
																0.012
															),
														}}
													/>
												)}
											</IconButton>
										</Grid>
									</Grid>
									<Grid
										container
										direction='column'
										justifyContent='center'
										alignItems='center'
										xs={0.5}
									>
										{/* Delete Area */}
										<Grid item xs={3}>
											<IconButton onClick={handleCommentDelete()}>
												<DeleteIcon
													style={{
														height: responsiveWidth(
															windowArray,
															18,
															50,
															0.015
														),
													}}
												/>
											</IconButton>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Grid>

						<Grid
							container
							direction='row'
							justifyContent='space-between'
							alignItems='center'
						>
							<Grid item xs={11}>
								{' '}
								<Box>
									{' '}
									<TextField
										variant='standard'
										fullWidth
										value={commentText}
										name='commentText'
										placeholder='Escreve aqui o teu comentário....'
										label=''
										onChange={handleComment}
										InputProps={{
											disableUnderline: true,
										}}
									/>
								</Box>
							</Grid>
							<Grid item xs={1}>
								{' '}
								<IconButton onClick={handleCommentSubmition}>
									<SendRoundedIcon />
								</IconButton>
							</Grid>
						</Grid>
					</Grid>
				</Box>
			</Grid>
		</Grid>
	);
}
