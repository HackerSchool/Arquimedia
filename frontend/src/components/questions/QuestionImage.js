import React from "react";

const QuestionImage = (props) => {
	const src = props.preview ? (props.question.image && URL.createObjectURL(props.question.image)) : "http://localhost:8000" + props.question.image

	return (
		<div>
			{props.question.image && 
				<img src={src} alt="visual support" style={{height: "20rem", width: "auto"}}/>
			}
		</div>
	)
}

export default QuestionImage;