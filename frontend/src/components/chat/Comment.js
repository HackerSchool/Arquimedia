import React, { useState } from 'react';
import {
	deleteCommentAPI,
	upvoteAPI,
	downvoteAPI,
	hasUpvotedAPI,
	hasDownvotedAPI,
	removeUpvoteAPI,
	removeDownvoteAPI,
} from '../../api';
import makeStyles from '@mui/styles/makeStyles';
import { ReactComponent as DeleteIcon } from '../../assets/deleteComment.svg';
import { ReactComponent as UpvoteIcon } from '../../assets/upvote.svg';
import { ReactComponent as DownvoteIcon } from '../../assets/downvote.svg';
import { ReactComponent as UpvoteFilledIcon } from '../../assets/upvoteFilled.svg';
import { ReactComponent as DownvoteFilledIcon } from '../../assets/downvoteFilled.svg';
import { Grid, Typography, IconButton } from '@mui/material';
import AvatarUser from '../avatar/AvatarUser';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import responsiveWidth from '../../hooks/responsiveWidth';
import Box from '../box/Box';

const useStyles = makeStyles(() => ({
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
export default function Comment(props) {
	const classes = useStyles();
	const [hasUpvoted, setHasUpvoted] = useState(false);
	const [hasDownvoted, setHasDownvoted] = useState(false);

	const windowArray = useWindowDimensions();

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
	return (
		<Grid container>
			{/* Comment Area */}
			<Grid item xs={1}>
				{' '}
				{/* User Photo*/}
				<AvatarUser user={props.comment.author} />
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
							fontSize: responsiveWidth(windowArray, 15, 20, 0.012),
						}}
					>
						{props.comment.author.username}
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
								{props.comment.content}
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
							<IconButton onClick={handleCommentUpvote(props.comment.id)}>
								{hasUpvoted ? (
									<UpvoteFilledIcon
										style={{
											height: responsiveWidth(windowArray, 22, 50, 0.012),
										}}
									/>
								) : (
									<UpvoteIcon
										style={{
											height: responsiveWidth(windowArray, 22, 50, 0.012),
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
									fontSize: responsiveWidth(windowArray, 12, 20, 0.012),
								}}
							>
								{props.comment.votes}
							</Typography>
						</Grid>
						<Grid item xs={1}>
							{' '}
							<IconButton onClick={handleCommentDownvote(props.comment.id)}>
								{hasDownvoted ? (
									<DownvoteFilledIcon
										style={{
											height: responsiveWidth(windowArray, 22, 50, 0.012),
										}}
									/>
								) : (
									<DownvoteIcon
										style={{
											height: responsiveWidth(windowArray, 22, 50, 0.012),
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
							{props.userID === props.comment.author.id || props.isUserMod ? (
								<IconButton onClick={handleCommentDelete(props.comment.id)}>
									<DeleteIcon
										style={{
											height: responsiveWidth(windowArray, 18, 50, 0.015),
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
	);
}
