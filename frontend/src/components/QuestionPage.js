import React, { Component } from "react";
import { render } from "react-dom";
import {
	Typography,
	Card,
	CardContent,
	Grid,
	Avatar,
	TextField,
	Button
} from "@material-ui/core";
import {
	Delete,
	ArrowUpward,
	ArrowDownward
} from "@material-ui/icons"
var Latex = require('react-latex');

// Renders a page about a specific Question and allows for comments on it
export default class QuestionPage extends Component {
	constructor(props) {
		super(props);
		this.ID = this.props.match.params.id;
	}

	render() {
		return (
			<Grid 
				container
				direction="row"
				justify="center"
				alignItems="center">
					<Grid item xs={12} align="center">
						<QuestionInfo ID={this.ID} />
					</Grid>
			</Grid>
		)
	}
}

// Displays information about a Question
class QuestionInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: "",
			subject: "",
			year: "",
			difficulty: "",
			comment: [],
			currentUser: 0
		}
		this.getQuestionInfo = this.getQuestionInfo.bind(this);
		this.addComment = this.addComment.bind(this);
		this.removeComment = this.removeComment.bind(this);
		this.getCurrentUser = this.getCurrentUser.bind(this);
		this.currentUser = this.getCurrentUser()
		console.log(this.currentUser);
		this.getQuestionInfo();
	}


	getCurrentUser() {
		fetch("/api/current_user")
		.then(response => response.json())
		.then((data) => {
			this.setState({currentUser: data.id})
		})
	}


	getQuestionInfo() {
		fetch("/api/question/" + this.props.ID)
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					text: data.text,
					subject: data.subject,
					year: data.year,
					difficulty: data.difficulty,
					comment: data.comment
				})
			});
	}


	addComment(data) {
		let newComments = this.state.comment.slice()
		newComments.push(data);
		this.setState({
			comment: newComments
		})
	}

	removeComment(data) {
		console.log(this.state.comment);
		console.log(data.id);
		let newComments = this.state.comment.filter(el => el.id != data.id);
		this.setState({
			comment: newComments
		});
	}

	render() {
		return (
			<Grid
				container
				direction="column"
				justify="center"
				alignItems="center">
				<Grid item xs={12} align="center">
					<Typography variant="h3"><Latex>{this.state.text}</Latex></Typography>
				</Grid>
				<Grid item xs={12} align="center">
					<Typography variant="h5">{this.state.subject}</Typography>
				</Grid>
				<Grid item xs={12} align="center">
					<Typography variant="h5">{this.state.year}</Typography>
				</Grid>
				<Grid item xs={12} align="center">
					<Typography variant="h5">{this.state.difficulty}</Typography>
				</Grid>
				{/* Comments */}
				
					{this.state.comment.map(comment => (
							<Comment data={comment} currentUser={this.state.currentUser} deleteCommentFun={data => this.removeComment(data)}/>
					))}
				
				<Grid item xs={12} align="center">
					<CommentInputBox questionID={this.props.ID} addComment={data => this.addComment(data)}/>
				</Grid>
			</Grid>
		)
	}
}


class Comment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			upvoted: false,
			downvoted: false
		}
		this.deleteComment = this.deleteComment.bind(this);
		this.upvote = this.upvote.bind(this);
		this.removeUpvote = this.removeUpvote.bind(this);
		this.downvote = this.downvote.bind(this);
		this.removeDownvote = this.removeDownvote.bind(this);
		console.log(this.props.currentUser);
	}

	deleteComment() {
		const csrftoken = getCookie('csrftoken')
		const requestOptions = {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				'X-CSRFToken': csrftoken
			}
		};

		fetch("/api/delete_comment/" + this.props.data.id, requestOptions)
		.then(response => response.json)
		.then(data => {
			this.props.deleteCommentFun(this.props.data);
		})
	}


	upvote() {
		
		if (!this.state.upvoted) {
			console.log("Upvoting");
			this.setState({
				upvoted: true,
				downvoted: false
			})
		} else this.removeUpvote()
	}


	removeUpvote() {
		console.log("Removing upvote");

		this.setState({upvoted: false})
	}


	downvote() {
		

		if (!this.state.downvoted) {
			console.log("Downvoting");
			this.setState({
				downvoted: true,
				upvoted: false
			})
		} else this.removeDownvote()
	}


	removeDownvote() {
		console.log("Removing downvote");

		this.setState({downvoted: false})
	}


	render() {
		let avatarLetter = this.props.data.author.username[0];
		return (
				<Card style={{
					width: "100%"
				}}>
					<CardContent>
						<Avatar>{avatarLetter}</Avatar>
						<Typography variant={"h6"}>{this.props.data.author.username}</Typography>
						<Typography variant={"caption"}>Votos: {this.props.data.votes}</Typography>
						<Typography variant={"body1"}>
						<Latex>{this.props.data.content}</Latex>
						</Typography>
						<Typography variant={"caption"}>{this.props.data.date}</Typography>
						{(this.props.currentUser == this.props.data.author.id) && <Button onClick={this.deleteComment}><Delete color="secondary" /></Button>}
						<Button><ArrowUpward color={this.state.upvoted ? ("primary") : ("action")} onClick={this.upvote}/></Button>
						<Button><ArrowDownward color={this.state.downvoted ? ("secondary") : ("action")} onClick={this.downvote}/></Button>
					</CardContent>
				</Card>
		)
	}
}

class CommentInputBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			content: "",
		}
		this.handleCommentSubmissionChange = this.handleCommentSubmissionChange.bind(this);
		this.createComment = this.createComment.bind(this);
	}
	

	createComment() {
		const csrftoken = getCookie('csrftoken');
		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				'X-CSRFToken': csrftoken
			},
			body: JSON.stringify({
				content: this.state.content,
				author: {id: 0},
				votes: 2,
				question: {id: this.props.questionID}
			}),
		};
		fetch("/api/create_comment", requestOptions)
			.then((response) => response.json())
			.then(data => this.props.addComment(data));
		
		document.getElementById("commentContent").value = "";
	}


	handleCommentSubmissionChange(e) {
		this.setState({
			content: e.target.value,
		});
	}


	render() {
		return (
			<Grid>
				<Grid item xs={12} align="center">
					<Typography variant="h5">Escreve um comentário:</Typography>
				</Grid>

				<Grid item xs={12} align="center">
						<form>
							<TextField 
								id="commentContent"
								label="Escreve aqui!"
								onChange={this.handleCommentSubmissionChange}/>
						</form>
				</Grid>

				<Grid item xs={12} align="center">
					<Button color="primary" variant="contained" onClick={this.createComment}>
						Submeter
					</Button>
				</Grid>
				
			</Grid>
		)
		
	}
}



function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}