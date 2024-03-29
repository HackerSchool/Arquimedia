import React, { useEffect, useState } from 'react';
import {
	Grid,
	Typography,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	IconButton,
	MenuItem,
	Select,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import Question from '../components/questions/Question';
import { fetchQuestion, getUser, getProfile, createReport } from '../api';
import theme from '../globalTheme';
import Box from '../components/Box/Box';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkKatex from 'rehype-katex';
import remarRehype from 'remark-rehype';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ArticleIcon from '@mui/icons-material/Article';
import useWindowDimensions from '../hooks/useWindowDimensions';
import responsiveWidth from '../hooks/responsiveWidth';
import { Chat } from '../components/chat/Chat';
import ReportDialog from '../components/dialogs/ReportDialog';
import { useSnackbar } from 'notistack';
import { ReactComponent as MessageReport } from '../assets/messageReport.svg';
import isSwear from '../utils/isSwear';
import globalTheme from '../globalTheme';
import Loading from '../components/loading/Loading';
import Subtitle from '../components/typographies/Subtitle';
import Description from '../components/typographies/Description';

const iconSelector = {
	video: <VideoLibraryIcon />,
	paper: <ArticleIcon />,
};

function descendingComparator(a, b, orderBy) {
	// We assume that values are descending
	if (Number(b[orderBy]) < Number(a[orderBy])) {
		// B<A logo A vai aparecer primeiro que B
		return -1;
	}
	if (Number(b[orderBy]) > Number(a[orderBy])) {
		// B>A logo B vai aparecer primeiro que A
		return 1;
	}
	return 0;
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]); //Stores each object and it's index prior to sorting
	stabilizedThis.sort((a, b) => {
		//Sorts according to a comparator Function (if it returns value > 0 sort A after B) (if it returns value < 0 sort B after A)
		//(If they are the same, the old indexes decide, and the same sorting is mantained for that case)
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
	//Eliminates old index, makes it only one element again, only store the first element of the array which is the initial object
}

export default function QuestionPage() {
	const { id } = useParams();
	const { enqueueSnackbar } = useSnackbar();
	const [question, setQuestion] = useState(null);
	const [userID, setUserID] = useState(null);
	const [isUserMod, setIsUserMod] = useState(false);
	const [open, setOpen] = useState(false);
	const [sortingType, setSortingType] = useState('votes');
	const [comments, setComments] = useState([]);

	const windowArray = useWindowDimensions();

	const sxStyles = {
		sorterText: { fontSize: responsiveWidth(windowArray, 13, 20, 0.01) },
		responsiveIcons: { width: responsiveWidth(windowArray, 20, 40, 0.025), height: 'auto' },
		itemInfoLabel: {
			fontWeight: 'bold',
			fontSize: responsiveWidth(windowArray, 10, 30, 0.012),
		},
		box: {
			border: '2px solid',
			borderRadius: 5,
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
	};

	const changeSorting = () => {
		if (sortingType === 'votes') {
			setSortingType('id');
		} else {
			setSortingType('votes');
		}
	};

	const sortRerender = (newComments = comments) => {
		setComments(
			stableSort(newComments, (a, b) => descendingComparator(a, b, sortingType)).map(
				(comment) => comment
			)
		);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};
	// eslint-disable-next-line no-unused-vars
	const reportCreator = (reportType, otherDescription) => {
		let body = '';
		if (otherDescription !== null) {
			body = { question: id, type: reportType, body: otherDescription };
		} else {
			body = { question: id, type: reportType };
		}
		createReport(
			body,
			(res) => {
				enqueueSnackbar(
					'Foi criado com sucesso a sua denúncia com id:' + String(res.data.id),
					{ variant: 'success' }
				);
			},
			() => {
				enqueueSnackbar('Não foi possível criar a sua denúncia, tente mais tarde...', {
					variant: 'error',
				});
			}
		);
	};
	const onClose = (reportType, otherDescription) => {
		// We only want to submit stuff when the user chooses a report Type, and in the case of the Other there must be some description
		// If there is some description regardless of report type it must have at least 30 characters
		setOpen(false);

		if (reportType === 'Other' && otherDescription === null) {
			enqueueSnackbar(
				"Submissão Inválida! Se escolheu 'Outro...', precisa de clarificar o problema encontrado...",
				{
					variant: 'error',
				}
			);
		} else if (
			reportType !== null &&
			otherDescription !== null &&
			String(otherDescription).length < 30
		) {
			enqueueSnackbar('A sua descrição necessita de um mínimo de 30 caractéres', {
				variant: 'error',
			});
			return;
		} else if (reportType !== null && isSwear(otherDescription)) {
			enqueueSnackbar('A sua descrição contém expressões agressivas/impróprias', {
				variant: 'warning',
			});
			return;
		} else if (reportType !== null) {
			reportCreator(reportType, otherDescription);
		}
	};
	useEffect(() => {
		if (question) {
			sortRerender(comments);
		} else {
			fetchQuestion(id, (res) => {
				setQuestion(res.data);
				sortRerender(res.data.comment);
			});
		}
	}, [sortingType]);

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

	if (question === null) {
		return (
			<Grid container justifyContent='center' alignItems='center'>
				<Loading />
			</Grid>
		);
	}
	return (
		<Grid container direction='row' justifyContent='center' alignItems='center'>
			{' '}
			<Grid container direction='row' justifyContent='center' alignItems='center' xs={10}>
				<Grid container spacing={4} alignItems='stretch'>
					{/* Question box */}
					<Grid item xs={9}>
						<Question
							question={question}
							overrideResponsive={true}
							answer={Number(id) - 1}
						/>{' '}
						{/* //So that the number we see in the question matches the id, since the answer prop was made for the specific case of exams,
				 it adds one more so that an exam does not start in 0. So this is a adaptation */}
					</Grid>
					{/* Question info box */}
					<Grid container item xs={3} direction='row'>
						<Grid
							container
							direction='column'
							justifyContent='space-between'
							alignItems='flex-start'
							sx={sxStyles.box}
						>
							<Grid container direction='column'>
								<Grid item>
									<Subtitle variant='h4'>Detalhes</Subtitle>
								</Grid>
								<Grid item>
									<Description variant='h6'>
										<span style={sxStyles.itemInfoLabel}>Disciplina:</span>{' '}
										{question.subject}
									</Description>
								</Grid>
								<Grid item>
									{' '}
									<Description variant='h6'>
										<span style={sxStyles.itemInfoLabel}>Tema:</span>{' '}
										{question.subsubject}
									</Description>
								</Grid>
								<Grid item>
									<Description variant='h6'>
										<span style={sxStyles.itemInfoLabel}>Ano:</span>{' '}
										{question.year}
									</Description>
								</Grid>
								<Grid item>
									<Description variant='h6'>
										<span style={sxStyles.itemInfoLabel}>Fonte:</span>{' '}
										{question.source}
									</Description>
								</Grid>
								<Grid item>
									<Description variant='h6'>
										<span style={sxStyles.itemInfoLabel}>Autor:</span>{' '}
									</Description>
								</Grid>
							</Grid>

							<Grid item>
								{' '}
								<IconButton sx={{ borderRadius: 15 }} onClick={handleClickOpen}>
									<MessageReport sx={sxStyles.responsiveIcons} />
									<Typography variant='h6' sx={sxStyles.itemInfoLabel}>
										Reportar Erro
									</Typography>
								</IconButton>
								<ReportDialog open={open} onClose={onClose}></ReportDialog>
							</Grid>
						</Grid>
					</Grid>
					{/* Resolution */}
					<Grid item xs={12}>
						<Box>
							<Subtitle variant='h4'>Resolução</Subtitle>
							{question.resolution ? (
								<Description variant='h6'>
									<ReactMarkdown
										remarkPlugins={[remarkMath, remarRehype, remarkKatex]}
									>
										{question.resolution}
									</ReactMarkdown>
								</Description>
							) : (
								<Description variant='h6'>
									Ainda estamos a trabalhar na resolução desta pergunta...
								</Description>
							)}
						</Box>
					</Grid>
					{/* Resources */}
					<Grid item xs={12}>
						<Accordion sx={sxStyles.box} square>
							<AccordionSummary>
								<Subtitle variant='h4'>+ Recursos</Subtitle>
							</AccordionSummary>
							<AccordionDetails>
								{question.resources.length > 0 ? (
									<>
										{question.resources.map((resource) => (
											<Grid
												container
												alignItems='center'
												key={sxStyles.description}
												sx={sxStyles.resourceGrid}
											>
												{iconSelector[resource.type]}
												<Description variant='h6' key={resource.text}>
													<a
														style={{
															textDecoration: 'none',
														}}
														sx={sxStyles.resource}
														href={resource.url}
														target='_blank'
														rel='noreferrer'
													>
														{resource.description}
													</a>
												</Description>
											</Grid>
										))}
									</>
								) : (
									<Description variant='h6'>
										Ainda estamos à procura de recursos...
									</Description>
								)}
							</AccordionDetails>
						</Accordion>
					</Grid>
					{/* Comments */}
					<Grid item xs={12}>
						<Box>
							<Grid container direction='column'>
								<Grid
									container
									direction='row'
									justifyContent='flex-end'
									alignItems='center'
								>
									<Grid item>
										<Select
											labelId='sorter'
											id='sorter'
											value={sortingType}
											onChange={changeSorting}
											sx={globalTheme.components.select.styleOverrides}
											MenuProps={{
												sx: globalTheme.components.menuItem.styleOverrides,
											}}
										>
											<MenuItem value={'votes'}>
												<Typography sx={sxStyles.sorterText}>
													Ordernar por Pontuação
												</Typography>
											</MenuItem>
											<MenuItem value={'id'}>
												<Typography sx={sxStyles.sorterText}>
													Ordernar por Data
												</Typography>
											</MenuItem>
										</Select>
									</Grid>
								</Grid>
								{/* List of Comments Area */}
								<Chat
									userID={userID}
									isUserMod={isUserMod}
									questionID={id}
									messageArray={comments}
									sortRerender={sortRerender}
								></Chat>
							</Grid>
						</Box>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}
