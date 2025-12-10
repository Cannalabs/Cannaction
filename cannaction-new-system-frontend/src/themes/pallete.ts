import { createTheme } from '@mui/material/styles';
import { presetPalettes } from '@ant-design/colors';
import { MyCustomTheme } from './theme';

const Palette = () => {
	const colors = presetPalettes;

	const greyPrimary = [
		'#fcfcfc',
		'#f4f5f5',
		'#f0f0f0',
		'#d9d9d9',
		'#dddddd',
		'#bfbfbf',
		'#8c8c8c',
		'#595959',
		'#262626',
		'#141414',
		'#000000',
	];

	const greyAscent = ['#fcfcfc', '#bfbfbf', '#434343', '#1f1f1f'];
	const greyConstant = ['#fafafb', '#e6ebf1'];

	colors.grey = [...greyPrimary, ...greyAscent, ...greyConstant];

	const paletteColor = MyCustomTheme;

	return createTheme({
		palette: {
			common: {
				black: '#000',
				white: '#fafafb',
			},
			...paletteColor,
		},
	});
};

export default Palette;
