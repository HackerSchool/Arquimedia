import React from "react";

const QuestionImage = (props) => {
	// Image can be already uploaded (string) or being uploaded now (file).
	const src = typeof props.question.image === 'string' ? props.question.image : URL.createObjectURL(props.question.image)

	return (
		<div>
			{props.question.image && 
				<img src={src} alt="visual support" style={{height: "20rem", width: "auto"}}/>
			}
		</div>
	)
}

export default QuestionImage;