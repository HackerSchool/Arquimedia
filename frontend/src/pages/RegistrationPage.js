import {
	Grid,
	Typography
} from "@material-ui/core";
import RegisterInput from "../components/register/RegisterInput";

const RegistrationPage = () => {

	return (
		<Grid container>
			<Grid item xs={12}>
				<Typography variant="h3">Regista-te</Typography>
			</Grid>
			<Grid item xs={12}>
				<RegisterInput />
			</Grid>
		</Grid>
	)
}

export default RegistrationPage;