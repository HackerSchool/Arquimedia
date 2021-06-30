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
			comment: {}
		}
		this.getQuestionInfo = this.getQuestionInfo.bind(this);
		this.getQuestionInfo();
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

	render() {
		const comments = Array.from(this.state.comment)
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
					{comments.map(comment => (
						<Grid item xs={12} align="center">
							<Comment data={comment} />
						</Grid>
					))}
				<Grid item xs={12} align="center">
					<CommentInputBox questionID={this.props.ID}/>
				</Grid>
			</Grid>
		)
	}
}


class Comment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			content: "",
			author: "",
			date: "",
			votes: 0
		}
	}

	render() {
		return (
				<Card>
					<CardContent>
						<Avatar>J</Avatar>
						<Typography variant={"h6"}>Autor: {this.props.data.author.username}</Typography>
						<Typography variant={"caption"}>Votos: {this.props.data.votes}</Typography>
						<Typography variant={"body1"}>
						<Latex>{this.props.data.content}</Latex>
						</Typography>
						<Typography variant={"caption"}>{this.props.data.date}</Typography>
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
			.then((data => console.log(data)));
		
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