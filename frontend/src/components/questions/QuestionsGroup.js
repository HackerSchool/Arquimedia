import React from 'react';
import Question from './Question';
import { useRef, forwardRef, useImperativeHandle } from 'react';
import { submitExam } from '../../api';

const QuestionsGroup = forwardRef((props, ref) => {
	let answers = useRef(Array(props.exam.questions.length).fill(0));

	useImperativeHandle(ref, () => ({
		submit: () => handleClick(),
	}));

	const callBack = (childData, index) => {
		// creates a copy of answers, modifies it and updates answers
		let newArray = Object.assign({}, answers.current);
		newArray[index] = childData;
		answers.current = newArray;
	};

	const handleClick = () => {
		let body = {};

		props.exam.questions.forEach((question, i) => {
			body[question.id] = answers.current[i];
		});

		submitExam(
			props.exam.id,
			body,
			(res) => (window.location.href = '/resultado/' + res.data.id)
		);
	};

	return (
		<Question
			selected={answers.current[props.questionIndex]}
			answer={props.questionIndex}
			key={props.exam.questions[props.questionIndex].id}
			question={props.exam.questions[props.questionIndex]}
			callBack={callBack}
		/>
	);
});

export default QuestionsGroup;
