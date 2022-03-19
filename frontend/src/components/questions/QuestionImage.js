import React from "react";

const QuestionImage = ({question}) => {

	return (
		<div>
			{question.image && 
				<img src={"http://localhost:8000" + question.image} alt="visual support" style={{height: "20rem", width: "auto"}}/>
			}
		</div>
	)
}

export default QuestionImage;