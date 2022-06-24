import React, { useState } from 'react';
import Comment from './Comment';
import { Grid, TextField, IconButton } from '@mui/material';
import Box from '../box/Box';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { createCommentAPI } from '../../api';

export function Chat(props) {
	const [commentText, setCommentText] = useState('');
	const [comments, setComments] = useState(props.messageArray);

	const handleComment = (e) => {
		setCommentText(e.target.value);
	};

	const handleCommentSubmition = () => {
		const body = {
			content: commentText,
			question: props.questionID,
		};

		createCommentAPI(body, (res) => {
			const newComments = comments.concat(res.data);
			setComments(newComments);
		});
		setCommentText('');
	};

	const deleteComment = (id) => {
		const newComments = comments.filter((e) => e.id !== id);
		setComments(newComments);
	};

	return (
		<Grid container direction='column'>
			{comments.map((comment) => (
				<Comment
					comment={comment}
					key={comment.id}
					userID={props.userID}
					isUserMod={props.isUserMod}
					deleteComment={deleteComment}
				></Comment>
			))}
			<Grid container direction='row' justifyContent='space-between' alignItems='center'>
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
	);
}
