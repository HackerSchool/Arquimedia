import { createTheme } from "@material-ui/core";

const globalTheme = createTheme({
	palette: {
		primary: {
			main: "#56CCF2",
			contrastText: "#fff"
		},
		secondary: {
			main: "#EB5757",
			contrastText: "#fff"
		},
		text: {
			primary: "#000"
		}
	},
});

export default globalTheme;