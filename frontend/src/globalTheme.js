import { createTheme, adaptV4Theme } from '@mui/material';

const globalTheme = createTheme(
	adaptV4Theme({
		palette: {
			background: {
				default: '#ffffff',
			},
			primary: {
				main: '#56CCF2',
				contrastText: '#fff',
			},
			secondary: {
				main: '#EB5757',
				contrastText: '#fff',
			},
			text: {
				primary: '#000000',
			},
			grey: {
				// for some reason theme.palette.grey.main doesn't work
				primary: '#F1F1F1',
			},
		},
		overrides: {
			MuiSelect: {
				'&.MuiOutlinedInput-notchedOutline': {
					border: 0,
				},
			},
			MuiOutlinedInput: {
				notchedOutline: {
					//border: 0
				},
			},
		},
	})
);

export default globalTheme;
