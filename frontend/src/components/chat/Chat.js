import React, { useState } from 'react';
import Comment from './Comment';
import { Grid, TextField, IconButton, Typography } from '@mui/material';
import Box from '../box/Box';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { createCommentAPI } from '../../api';
// Delete this line after deleting dummy comment
import { ReactComponent as DeleteIcon } from '../../assets/deleteComment.svg';
import { ReactComponent as UpvoteIcon } from '../../assets/upvote.svg';
import { ReactComponent as DownvoteIcon } from '../../assets/downvote.svg';
import makeStyles from '@mui/styles/makeStyles';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import responsiveWidth from '../../hooks/responsiveWidth';

const useStyles = makeStyles(() => ({
	// Delete all classes after deleting dummy comment
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
export function Chat(props) {
	const classes = useStyles();
	const [commentText, setCommentText] = useState('');

	const windowArray = useWindowDimensions(); // Delete after deleting dummy comment

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
										fontSize: responsiveWidth(windowArray, 12, 20, 0.012),
									}}
								>
									consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
									labore et dolore magna aliqua. Ut enim ad minim veniam, quis
									nostrud exercitation ullamco laboris
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
								<IconButton>
									<UpvoteIcon
										style={{
											height: responsiveWidth(windowArray, 22, 50, 0.012),
										}}
									/>
								</IconButton>
							</Grid>
							<Grid item xs={1}>
								<Typography
									variant='h6'
									className={classes.voteCounter}
									style={{
										fontSize: responsiveWidth(windowArray, 12, 20, 0.012),
									}}
								>
									1
								</Typography>
							</Grid>
							<Grid item xs={1}>
								{' '}
								<IconButton>
									<DownvoteIcon
										style={{
											height: responsiveWidth(windowArray, 22, 50, 0.012),
										}}
									/>
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
								<IconButton>
									<DeleteIcon
										style={{
											height: responsiveWidth(windowArray, 18, 50, 0.015),
										}}
									/>
								</IconButton>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
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
