import quillEmoji from 'quill-emoji';
import 'quill-emoji/dist/quill-emoji.css';
import React from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill, { Quill } from 'react-quill';
import { Grid } from '@mui/material';

const { EmojiBlot, ShortNameEmoji, ToolbarEmoji, TextAreaEmoji } = quillEmoji;

Quill.register(
	{
		'formats/emoji': EmojiBlot,
		'modules/emoji-shortname': ShortNameEmoji,
		'modules/emoji-toolbar': ToolbarEmoji,
		'modules/emoji-textarea': TextAreaEmoji,
	},
	true
);

export const QuillComponent: React.FC<{
	onContentChange: (content: string) => void;
	value: string;
}> = ({ onContentChange, value }) => {

	const handleChange = (value) => {
		onContentChange(value);
	};

	const modules = {
		toolbar: [
			[{ font: [] }, { header: [] }],
			['bold', 'italic', 'underline', 'strike', 'blockquote', 'link'],
			[{ color: [] }, { background: [] }],
			[
				{ list: 'ordered' },
				{ list: 'bullet' },
				{ indent: '-1' },
				{ indent: '+1' },
			],
			[{ align: [] }],
			['clean'],
		],
		'emoji-toolbar': true,
		'emoji-textarea': true,
		'emoji-shortname': true,
	};

	const formats = [
		'font',
		'header',
		'bold',
		'italic',
		'underline',
		'strike',
		'blockquote',
		'code-block',
		'color',
		'background',
		'list',
		'indent',
		'align',
		'link',
		'image',
		'clean',
		'emoji',
	];

	return (
		<Grid container>
			<ReactQuill
				onChange={handleChange}
				value={value}
				theme={'snow'}
				modules={modules}
				formats={formats}
				bounds={'.app'}
				placeholder={'Type Body Here'}
				style={{ width: '100%', marginBottom: '57px' }}
				id="text"
			/>
		</Grid>
	);
};
