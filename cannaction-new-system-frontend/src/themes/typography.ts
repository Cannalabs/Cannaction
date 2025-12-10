const Typography = (fontFamily: string) => ({
	htmlFontSize: 16,
	fontFamily,
	fontWeightLight: 300,
	fontWeightRegular: 400,
	fontWeightMedium: 500,
	fontWeightBold: 600,
	h1: {
		fontWeight: 500,
		fontSize: '2.25rem',
		lineHeight: 1.21,
	},
	h2: {
		fontWeight: 600,
		fontSize: '1.875rem',
		lineHeight: 1.27,
	},
	h3: {
		fontWeight: 600,
		fontSize: '1.5rem',
		lineHeight: 1.33,
	},
	h4: {
		fontWeight: 500,
		fontSize: '1.15rem',
		lineHeight: 1.4,
	},
	h5: {
		fontWeight: 500,
		fontSize: '1rem',
		lineHeight: '19.6px',
	},
	h6: {
		fontWeight: 400,
		fontSize: '0.875rem', // 14px
		lineHeight: 1.57,
	},
	caption: {
		fontWeight: 400,
		fontSize: '0.75rem',
		lineHeight: 1.66,
	},
	body1: {
		fontSize: '0.875rem',
		lineHeight: 1.57,
	},
	body2: {
		fontSize: '0.85rem',
		lineHeight: 1.66,
	},
	subtitle: {
		fontSize: '0.875rem',
		fontWeight: 600,
		lineHeight: 'normal',
	},
	subtitle1: {
		fontSize: '1.125rem',
		fontWeight: 500,
		lineHeight: 'normal',
	},
	subtitle2: {
		fontSize: '1.375rem', // 22px
		fontWeight: 500,
		lineHeight: '19.6px',
	},
});

export default Typography;
