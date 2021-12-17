import React from "react";

const QuestionImage = ({question}) => {

	return (
		<div>
			{question.image && 
				<img src={question.image} alt="visual support" style={{width: "80%"}}/>
			}
		</div>
	)
}

export default QuestionImage;