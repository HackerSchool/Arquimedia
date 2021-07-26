import {
	TextField,
	Grid,
	Button
} from "@material-ui/core";


const LoginInput = () => {

	return (
		<Grid container spacing={3}>
			<Grid item xs={12}>
				<TextField variant="outlined" label="Username" />
			</Grid>
			<Grid item xs={12}>
				<TextField variant="outlined" label="Password" />
			</Grid>
			<Grid item xs={12}>
				<Button>Login</Button>
			</Grid>
		</Grid>
	)
}

export default LoginInput;