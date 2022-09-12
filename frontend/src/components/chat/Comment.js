import React, { useState, useEffect } from 'react';
import {
	deleteCommentAPI,
	upvoteAPI,
	downvoteAPI,
	removeUpvoteAPI,
	removeDownvoteAPI,
} from '../../api';
import { ReactComponent as DeleteIcon } from '../../assets/deleteComment.svg';
import { ReactComponent as UpvoteIcon } from '../../assets/upvote.svg';
import { ReactComponent as DownvoteIcon } from '../../assets/downvote.svg';
import { ReactComponent as UpvoteFilledIcon } from '../../assets/upvoteFilled.svg';
import { ReactComponent as DownvoteFilledIcon } from '../../assets/downvoteFilled.svg';
import { Grid, IconButton } from '@mui/material';
import AvatarUser from '../avatar/AvatarUser';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import responsiveWidth from '../../hooks/responsiveWidth';
import Box from '../Box/Box';
import Description from '../typographies/Description';

export default function Comment(props) {
	const [voted, setVoted] = useState(props.comment.voted);
	const [votes, setVotes] = useState(props.comment.votes);
	const [timeShown, setTimeShown] = useState(null);

	const windowArray = useWindowDimensions();

	const sxStyles = {
		arrowIcons: { height: responsiveWidth(windowArray, 22, 50, 0.012) },
		deleteIcons: { height: responsiveWidth(windowArray, 18, 50, 0.015) },
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
		avatarComment: {
			width: responsiveWidth(windowArray, undefined, 75, 0.035),
			height: responsiveWidth(windowArray, undefined, 75, 0.035),
		},
		descriptiveText: {
			fontSize: responsiveWidth(windowArray, 10, 30, 0.012),
		},
	};

	const handleCommentDelete = () => {
		deleteCommentAPI(props.comment.id, () => {
			props.deleteComment(props.comment.id);
		});
	};

	const handleCommentUpvote = () => {
		let votesToAdd = 1;
		if (voted === 1) {
			removeUpvoteAPI(props.comment.id, () => {
				setVoted(0);
				setVotes(votes - 1);
				props.handleVoteChange(props.comment.id, votes - 1);
			});

			return;
		} else if (voted === -1) votesToAdd++;

		upvoteAPI(props.comment.id, () => {
			setVoted(1);
			setVotes(votes + votesToAdd);
			props.handleVoteChange(props.comment.id, votes + votesToAdd);
		});
	};

	const handleCommentDownvote = () => {
		let votesToRemove = 1;
		if (voted === -1) {
			removeDownvoteAPI(props.comment.id, () => {
				setVoted(0);
				setVotes(votes + 1);
				props.handleVoteChange(props.comment.id, votes + 1);
			});

			return;
		} else if (voted === 1) votesToRemove++;

		downvoteAPI(props.comment.id, () => {
			setVoted(-1);
			setVotes(votes - votesToRemove);
			props.handleVoteChange(props.comment.id, votes - votesToRemove);
		});
	};
	function getCurrentDate(separator = '-') {
		let newDate = new Date();
		let date = newDate.getDate();
		let month = newDate.getMonth() + 1;
		let year = newDate.getFullYear();

		return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`;
	}

	useEffect(() => {
		const currentDate = getCurrentDate('-');
		const time = props.comment.date.slice(11, -11); //Gets the time HH:MM
		const date = props.comment.date.slice(0, 10); //Date YYYY-MM-DD
		if (currentDate === date) {
			setTimeShown('- ' + time);
		} else {
			setTimeShown('- ' + date + ' ' + time);
		}
	}, []);

	return (
		<Grid container direction='row' justifyContent='center' alignItems='center'>
			{/* Comment Area */}
			<Grid container xs={1} direction='row' justifyContent='center' alignItems='center'>
				{' '}
				{/* User Photo*/}
				<AvatarUser user={props.comment.author} sx={sxStyles.avatarComment} />
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
					<Description style={sxStyles.author}>
						{props.comment.author.username} {timeShown}
					</Description>
				</Grid>
				<Grid container direction='row' alignItems='center'>
					<Grid item xs={11}>
						{' '}
						{/* Comment content*/}{' '}
						<Box>
							<Description>{props.comment.content}</Description>
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
							<IconButton onClick={() => handleCommentUpvote()}>
								{voted === 1 ? (
									<UpvoteFilledIcon sx={sxStyles.arrowIcons} />
								) : (
									<UpvoteIcon sx={sxStyles.arrowIcons} />
								)}
							</IconButton>
						</Grid>
						<Grid item xs={1}>
							<Description variant='h6' style={sxStyles.voteCounter}>
								{votes}
							</Description>
						</Grid>
						<Grid item xs={1}>
							{' '}
							<IconButton onClick={() => handleCommentDownvote()}>
								{voted === -1 ? (
									<DownvoteFilledIcon sx={sxStyles.arrowIcons} />
								) : (
									<DownvoteIcon sx={sxStyles.arrowIcons} />
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
								<IconButton onClick={() => handleCommentDelete()}>
									<DeleteIcon sx={sxStyles.deleteIcons} />
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
