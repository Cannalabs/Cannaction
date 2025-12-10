import { keyframes, styled } from '@mui/system';

const contentShow = keyframes`
	0% { opacity: 0; transform: translate(-50%, -48%) scale(.96); }
	100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
`;

export const Content = styled('div')(({ theme }) => ({
	backgroundColor: theme.palette.secondary[50],
	borderRadius: '8px',
	boxShadow: `${theme.palette.grey[900]} 0px 10px 38px -10px, ${theme.palette.grey[800]} 0px 10px 20px -15px`,
	position: 'fixed',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '25vw',
	padding: theme.spacing(4),
	animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,

	'&:focus': {
		outline: 'none',
	},
}));

export const DialogTitle = styled('h2')(({ theme }) => ({
	color: theme.palette.grey[800],
}));

export const DialogText = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	flexDirection: 'row',
	textAlign: 'center',
	fontStyle: 'normal',
	color: theme.palette.grey[800],
}));

export const BoxContent = styled('div')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	padding: theme.spacing(4),
	gap: theme.spacing(2),
	width: '100%',
	height: '206px',
}));

export const DivButtons = styled('div')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'center',
	gap: theme.spacing(2),
	width: '100%',
	height: '44px',
}));
