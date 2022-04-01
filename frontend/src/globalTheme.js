import { createTheme } from "@material-ui/core";

const globalTheme = createTheme({
	palette: {
		background: {
			default: '#ffffff'
		},
		primary: {
			main: "#56CCF2",
			contrastText: "#fff"
		},
		secondary: {
			main: "#EB5757",
			contrastText: "#fff"
		},
		text: {
			primary:'#000000'
		},
		grey: { // for some reason theme.palette.grey.main doesn't work
			primary: "#F1F1F1"
		},
	},
});

export default globalTheme;