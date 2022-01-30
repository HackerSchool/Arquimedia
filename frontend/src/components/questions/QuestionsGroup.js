import React from "react";
import Question from "./Question";
import { useState, forwardRef, useImperativeHandle } from "react";
import {
	Grid,
	Button
} from "@material-ui/core";
import { submitExam } from "../../api";

const QuestionsGroup = forwardRef((props, ref) => {
	const [answers, setAnswers] = useState(Array(props.exam.questions.length).fill(0));

	useImperativeHandle(
		ref,
		() => ({
			submit: () => handleClick()
		})
	)

	const callBack = (childData, index) => {
		// creates a copy of answers, modifies it and updates answers
		let newArray = Object.assign({}, answers);
		newArray[index] = childData;
		setAnswers(newArray);
	}

	const handleClick = () => {
		let body = {};

		props.exam.questions.forEach((question, i) => {
			body[question.id] = answers[i];
		})

		submitExam(props.exam.id, body, (res) => window.location.href = "/resultado/" + res.data.id)
	}

	return (
		<Grid container spacing={4}>
			<Grid item xs={12} key={props.exam.questions[props.questionIndex].id}>
				<Question key={props.exam.questions[props.questionIndex].id} question={props.exam.questions[props.questionIndex]} callBack={callBack}/>
			</Grid>
		</Grid>
	)
})

export default QuestionsGroup;