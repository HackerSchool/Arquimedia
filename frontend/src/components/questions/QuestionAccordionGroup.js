import React from 'react';
import QuestionAccordion from './QuestionAccordion';

const QuestionAccordionGroup = ({ exam }) => {
	return (
		<div>
			{exam.questions.map((question) => {
				return (
					<QuestionAccordion
						key={question.id}
						question={question}
						failed={exam.failed.some((el) => el.id === question.id)}
					/>
				);
			})}
		</div>
	);
};

export default QuestionAccordionGroup;
