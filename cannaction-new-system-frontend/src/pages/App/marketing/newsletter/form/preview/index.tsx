import React from 'react';
import { Content } from '../content';

interface ContentProps {
	content: string;
	footer: string;
}

export const Preview: React.FC<ContentProps> = ({ content, footer }) => {
	return (
		<div className="card mb-4">
			<div className="card-header">Preview</div>
			<div className="card-body">
				<Content content={content} footer={footer} />
			</div>
		</div>
	);
};
