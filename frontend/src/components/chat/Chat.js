import React, { useState } from 'react';
import Comment from './Comment';
import { Grid, TextField, IconButton } from '@mui/material';
import Box from '../box/Box';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { createCommentAPI } from '../../api';

export function Chat(props) {
	const [commentText, setCommentText] = useState('');

	const handleComment = (e) => {
		setCommentText(e.target.value);
	};

	const handleCommentSubmition = () => {
		const body = {
			content: commentText,
			author: props.userID,
			question: props.questionID,
		};

		createCommentAPI(body, (res) => {
			console.log(res.data);
		});
	};
	return (
		<Grid container direction='column'>
			{props.messageArray.map((comment) => (
				<Comment
					comment={comment}
					key={comment.id}
					userID={props.userID}
					isUserMod={props.isUserMod}
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
