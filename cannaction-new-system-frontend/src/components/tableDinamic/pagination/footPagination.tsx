import React, { ReactNode } from 'react';
import { styled } from 'styled-components';

interface Props {
	width?: string;
	children: ReactNode;
}

const StyledFooter = styled.footer<Props>`
	width: ${(props) => props.width};
	height: 88px;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding: 0px 16px;
	gap: 32px;
`;

export const Footer: React.FC<Props> = ({ children, width = '100vw' }) => {
	return <StyledFooter width={width}>{children}</StyledFooter>;
};
