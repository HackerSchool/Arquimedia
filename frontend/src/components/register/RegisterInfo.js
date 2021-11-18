import React from "react";
import {
	Grid,
	Typography,
	Button,
	Link
} from "@material-ui/core";

const RegisterInfo = () => {
	return (
		<Grid container spacing={4} xs={12}>
			<Grid item xs={12}>
				<Typography variant="h3">Junta-te a nós</Typography>
			</Grid>
			<Grid item xs={12}>
				<Typography variant="h5">
					Estuda para os exames nacionais<br /> com treino customizado <br /> e feedback de progresso
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<Link>
					<Button variant="contained" >Sobre nós</Button>
				</Link>
			</Grid>
		</Grid>
	)
}

export default RegisterInfo;