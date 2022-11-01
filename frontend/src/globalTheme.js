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
				primary: '#D9D9D9',
			},
		},
		overrides: {
			menuItem: {
				'&& .Mui-selected': {
					backgroundColor: '#D9D9D9',
				},
				'&& .Mui-focusVisible': {
					backgroundColor: 'transparent',
				},
			},
			select: {
				'& .MuiOutlinedInput-notchedOutline': {
					border: 'none',
				},
			},
		},
	})
);

export default globalTheme;
