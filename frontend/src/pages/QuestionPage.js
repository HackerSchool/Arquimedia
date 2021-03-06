import React, { Component } from 'react';
import { Typography, Grid, TextField, Button, Paper, Divider } from '@mui/material';
import AvatarUser from '../components/avatar/AvatarUser';
import { Delete, ArrowUpward, ArrowDownward } from '@mui/icons-material';
import {
	questionInfo,
	getUser,
	hasDownvotedAPI,
	hasUpvotedAPI,
	upvoteAPI,
	downvoteAPI,
	deleteCommentAPI,
	removeDownvoteAPI,
	removeUpvoteAPI,
	createCommentAPI,
} from '../api';
import $ from 'jquery';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkKatex from 'rehype-katex';
import remarRehype from 'remark-rehype';

// Renders a page about a specific Question and allows for comments on it
export default class QuestionPage extends Component {
	constructor(props) {
		super(props);
		this.ID = this.props.match.params.id;
	}

	render() {
		return (
			<Grid container direction='row' justifyContent='center' alignItems='center'>
				<Grid item xs={12} align='center'>
					<QuestionInfo ID={this.ID} />
				</Grid>
			</Grid>
		);
	}
}

// Displays information about a Question
class QuestionInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: '',
			subject: '',
			year: '',
			difficulty: '',
			image: '',
			comment: [],
			currentUser: 0,
		};
		this.getQuestionInfo = this.getQuestionInfo.bind(this);
		this.addComment = this.addComment.bind(this);
		this.removeComment = this.removeComment.bind(this);
		this.getCurrentUser = this.getCurrentUser.bind(this);
		this.currentUser = this.getCurrentUser();
		this.getQuestionInfo();
	}

	getCurrentUser() {
		getUser((res) => {
			this.setState({ currentUser: res.data.id });
		});
	}

	getQuestionInfo() {
		questionInfo(this.props.ID, (res) => {
			this.setState({
				text: res.data.text,
				subject: res.data.subject,
				year: res.data.year,
				difficulty: res.data.difficulty,
				image: res.data.image,
				comment: res.data.comment,
			});
		});
	}

	addComment(data) {
		let newComments = this.state.comment.slice();
		newComments.push(data);
		this.setState({
			comment: newComments,
		});
	}

	removeComment(data) {
		let newComments = this.state.comment.filter((el) => el.id !== data.id);
		this.setState({
			comment: newComments,
		});
	}

	render() {
		return (
			<div>
				<Grid container direction='column' justifyContent='center' alignItems='center'>
					<Grid item xs={12} align='center'>
						<Typography variant='h3'>
							<ReactMarkdown remarkPlugins={[remarkMath, remarRehype, remarkKatex]}>
								{this.state.text}
							</ReactMarkdown>
						</Typography>
					</Grid>
					<Grid item xs={12} align='center'>
						<img src={this.state.image} alt='visual support' style={{ width: '40%' }} />
					</Grid>
					<Grid item xs={12} align='center'>
						<Typography variant='h5'>{this.state.subject}</Typography>
					</Grid>
					<Grid item xs={12} align='center'>
						<Typography variant='h5'>{this.state.year}</Typography>
					</Grid>
					<Grid item xs={12} align='center'>
						<Typography variant='h5'>{this.state.difficulty}</Typography>
					</Grid>
				</Grid>
				{/* Comments */}
				<div style={{ width: '80%' }}>
					<Paper style={{ padding: '40px 20px' }} variant='fullWidth'>
						{this.state.comment.map((comment) => (
							<div key={comment}>
								<Comment
									key={comment}
									data={comment}
									currentUser={this.state.currentUser}
									deleteCommentFun={(data) => this.removeComment(data)}
								/>
								{comment !== this.state.comment[this.state.comment.length - 1] && (
									<Divider variant='fullWidth' style={{ margin: '30px 0' }} />
								)}
							</div>
						))}
					</Paper>
				</div>
				<CommentInputBox
					questionID={this.props.ID}
					addComment={(data) => this.addComment(data)}
				/>
			</div>
		);
	}
}

class Comment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			upvoted: false,
			downvoted: false,
			votes: this.props.data.votes,
		};
		this.deleteComment = this.deleteComment.bind(this);
		this.upvote = this.upvote.bind(this);
		this.removeUpvote = this.removeUpvote.bind(this);
		this.downvote = this.downvote.bind(this);
		this.removeDownvote = this.removeDownvote.bind(this);
		this.hasUpvoted = this.hasUpvoted.bind(this);
		this.hasDownvoted = this.hasDownvoted.bind(this);
		this.hasUpvoted();
		this.hasDownvoted();
		this.csrftoken = getCookie('csrftoken');
	}

	hasDownvoted() {
		hasDownvotedAPI(this.props.data.id, () => this.setState({ downvoted: true }));
	}

	hasUpvoted() {
		hasUpvotedAPI(this.props.data.id, () => this.setState({ upvoted: true }));
	}

	deleteComment() {
		deleteCommentAPI(this.props.data.id, () => {
			this.props.deleteCommentFun(this.props.data);
		});
	}

	upvote() {
		if (!this.state.upvoted) {
			upvoteAPI(this.props.data.id, (res) => {
				this.setState({
					upvoted: true,
					downvoted: false,
					votes: res.data.votes,
				});
			});
		} else this.removeUpvote();
	}

	removeUpvote() {
		removeUpvoteAPI(this.props.data.id, (res) => {
			this.setState({
				upvoted: false,
				votes: res.data.votes,
			});
		});
	}

	downvote() {
		if (!this.state.downvoted) {
			downvoteAPI(this.props.data.id, (res) => {
				this.setState({
					downvoted: true,
					upvoted: false,
					votes: res.data.votes,
				});
			});
		} else this.removeDownvote();
	}

	removeDownvote() {
		removeDownvoteAPI(this.props.data.id, (res) => {
			this.setState({
				downvoted: false,
				votes: res.data.votes,
			});
		});
	}

	render() {
		return (
			<div style={{ padding: 14 }}>
				<Grid container wrap='nowrap' spacing={2}>
					<Grid item>
						<AvatarUser user={this.props.data.author} />
						<Typography variant={'h6'}>{this.state.votes}</Typography>
					</Grid>
					<Grid justifyContent='left' item xs zeroMinWidth>
						<Typography variant={'h6'} style={{ margin: 0, textAlign: 'left' }}>
							{this.props.data.author.username}
						</Typography>

						<Typography variant={'body1'} style={{ margin: 0, textAlign: 'left' }}>
							<ReactMarkdown remarkPlugins={[remarkMath, remarRehype, remarkKatex]}>
								{this.props.data.content}
							</ReactMarkdown>
						</Typography>

						<Typography variant={'caption'}>{this.props.data.date}</Typography>

						<Button>
							<ArrowUpward
								color={this.state.upvoted ? 'primary' : 'action'}
								onClick={this.upvote}
							/>
						</Button>

						<Button>
							<ArrowDownward
								color={this.state.downvoted ? 'secondary' : 'action'}
								onClick={this.downvote}
							/>
						</Button>
					</Grid>
					<Grid item xs={1}>
						{this.props.currentUser === this.props.data.author.id && (
							<Button onClick={this.deleteComment}>
								<Delete color='secondary' />
							</Button>
						)}
					</Grid>
				</Grid>
			</div>
		);
	}
}

class CommentInputBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			content: '',
		};
		this.handleCommentSubmissionChange = this.handleCommentSubmissionChange.bind(this);
		this.createComment = this.createComment.bind(this);
	}

	createComment() {
		if (this.state.content !== '') {
			const body = {
				content: this.state.content,
				author: { id: 0 },
				votes: 2,
				question: { id: this.props.questionID },
			};

			createCommentAPI(body, (res) => {
				this.props.addComment(res.data);
				document.getElementById('commentContent').value = '';
				this.setState({ content: '' });
			});
		} else alert('Escreve algo primeiro!');
	}

	handleCommentSubmissionChange(e) {
		this.setState({
			content: e.target.value,
		});
	}

	render() {
		return (
			<Grid>
				<Grid item xs={12} align='center'>
					<Typography variant='h5'>Escreve um coment??rio:</Typography>
				</Grid>

				<Grid item xs={12} align='center'>
					<form>
						<TextField
							id='commentContent'
							label='Escreve aqui!'
							onChange={this.handleCommentSubmissionChange}
							style={{ width: '40%' }}
						/>
					</form>
				</Grid>

				<Grid item xs={12} align='center'>
					<Button color='primary' variant='contained' onClick={this.createComment}>
						Submeter
					</Button>
				</Grid>
			</Grid>
		);
	}
}

function getCookie(name) {
	var cookieValue = null;
	if (document.cookie && document.cookie !== '') {
		var cookies = document.cookie.split(';');
		for (var i = 0; i < cookies.length; i++) {
			var cookie = $.trim(cookies[i]);
			if (cookie.substring(0, name.length + 1) === name + '=') {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
}
