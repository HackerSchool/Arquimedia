import { createTheme } from "@material-ui/core";


const themeDark = createTheme({
	palette: {
		background: {
			default: '#000000'
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
			primary: '#ffffff'
		},
		grey: { // for some reason theme.palette.grey.main doesn't work
			primary: "#F1F1F1"
		}
	},
});

export default themeDark;