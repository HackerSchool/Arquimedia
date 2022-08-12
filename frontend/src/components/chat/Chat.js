import React, { useState } from 'react';
import Comment from './Comment';
import { Grid, TextField, IconButton, MenuItem, Select, Typography } from '@mui/material';
import Box from '../box/Box';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { createCommentAPI } from '../../api';
import isSwear from '../../utils/isSwear';
import { useSnackbar } from 'notistack';
import globalTheme from '../../globalTheme';
import { useEffect } from 'react';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import responsiveWidth from '../../hooks/responsiveWidth';

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

export function Chat(props) {
	const { enqueueSnackbar } = useSnackbar();
	const [sortingType, setSortingType] = useState('votes');
	const [commentText, setCommentText] = useState('');
	const [comments, setComments] = useState(props.messageArray);

	const windowArray = useWindowDimensions();

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

	const handleVoteChange = (id, vote) => {
		const newComments = comments.map((comment) => {
			if (comment.id === id) {
				comment.votes = vote;
			}
			return comment;
		});
		sortRerender(newComments);
	};

	const handleComment = (e) => {
		setCommentText(e.target.value);
	};

	const handleCommentSubmition = () => {
		const body = {
			content: commentText,
			question: props.questionID,
		};
		if (isSwear(body.content)) {
			enqueueSnackbar('O seu comentário contém expressões agressivas/impróprias', {
				variant: 'warning',
			});
		} else {
			createCommentAPI(body, (res) => {
				const newComments = comments.concat(res.data);
				sortRerender(newComments);
			});
		}
		setCommentText('');
	};

	const deleteComment = (id) => {
		const newComments = comments.filter((e) => e.id !== id);
		sortRerender(newComments);
	};
	useEffect(() => {
		sortRerender(comments);
	}, [sortingType]);

	return (
		<Grid container direction='column'>
			<Grid container direction='row' justifyContent='flex-end' alignItems='center'>
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
							<Typography
								style={{
									fontSize: responsiveWidth(windowArray, 10, 20, 0.01),
								}}
							>
								Ordernar por Pontuação
							</Typography>
						</MenuItem>
						<MenuItem value={'id'}>
							<Typography
								style={{
									fontSize: responsiveWidth(windowArray, 10, 20, 0.01),
								}}
							>
								Ordernar por Data
							</Typography>
						</MenuItem>
					</Select>
				</Grid>
			</Grid>
			{comments.map((comment) => (
				<Comment
					comment={comment}
					key={comment.id}
					userID={props.userID}
					isUserMod={props.isUserMod}
					deleteComment={deleteComment}
					handleVoteChange={handleVoteChange}
				></Comment>
			))}
			<Grid container direction='row' justifyContent='space-between' alignItems='center'>
				<Grid item xs={true}>
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
				<Grid item>
					{' '}
					<IconButton onClick={handleCommentSubmition}>
						<SendRoundedIcon />
					</IconButton>
				</Grid>
			</Grid>
		</Grid>
	);
}
