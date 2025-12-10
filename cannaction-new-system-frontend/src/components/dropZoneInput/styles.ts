import styled from 'styled-components';

interface Props {
	hasFile: boolean;
	disabled: boolean;
}

export const DragDrop = styled.div<Props>`
	width: 100%;
	height: 100%;
	border: 2px dashed ${(props) => (props.hasFile ? '#1b7f75' : 'lightGray')};
	border-radius: 4px;
	margin-bottom: 16px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	transition: all 0.3s ease-in-out;

	&:hover {
		opacity: ${(props) => (props.disabled ? '1' : '0.8')};
		background-color: ${(props) =>
			props.disabled ? 'transparent' : 'lightGray'};
		cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
	}
`;

export const TextInputFile = styled.input`
	opacity: 0;
	position: absolute;
	width: 22%;
	height: 26%;
`;
