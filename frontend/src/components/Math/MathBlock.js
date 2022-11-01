import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkKatex from 'rehype-katex';
import remarRehype from 'remark-rehype';

export const MathBlock = (props) => {
	return (
		<ReactMarkdown remarkPlugins={[remarkMath, remarRehype, remarkKatex]}>
			{...props}
		</ReactMarkdown>
	);
};
