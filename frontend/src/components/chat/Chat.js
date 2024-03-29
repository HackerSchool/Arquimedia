import React, { useState } from 'react';
import Comment from './Comment';
import { Grid, TextField, IconButton } from '@mui/material';
import Box from '../Box/Box';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { createCommentAPI } from '../../api';
import isSwear from '../../utils/isSwear';
import { useSnackbar } from 'notistack';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import responsiveWidth from '../../hooks/responsiveWidth';

export function Chat(props) {
	const { enqueueSnackbar } = useSnackbar();
	const [commentText, setCommentText] = useState('');
	const windowArray = useWindowDimensions();

	const sxStyles = {
		textfieldPlaceholder: {
			'& .MuiInputBase-input': {
				fontSize: responsiveWidth(windowArray, 13, 20, 0.01),
			},
		},
		responsiveIcons: { width: responsiveWidth(windowArray, 20, 40, 0.025), height: 'auto' },
	};

	const handleVoteChange = (id, vote) => {
		const newComments = props.messageArray.map((comment) => {
			if (comment.id === id) {
				comment.votes = vote;
			}
			return comment;
		});
		props.sortRerender(newComments);
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
				const newComments = props.messageArray.concat(res.data);
				props.sortRerender(newComments);
			});
		}
		setCommentText('');
	};

	const deleteComment = (id) => {
		const newComments = props.messageArray.filter((e) => e.id !== id);
		props.sortRerender(newComments);
	};

	return (
		<Grid container direction='column'>
			{props.messageArray.map((comment) => (
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
							sx={sxStyles.textfieldPlaceholder}
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
						<SendRoundedIcon sx={sxStyles.responsiveIcons} />
					</IconButton>
				</Grid>
			</Grid>
		</Grid>
	);
}
