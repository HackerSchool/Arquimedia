import React, {useState} from 'react'
import { Grid, makeStyles, Typography, TextField, Button, Collapse, IconButton } from '@material-ui/core'
import { confirmPasswordReset } from '../api';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles(theme => ({
	mainBox: {
		marginTop: "5rem",
		textAlign: 'center'
	},
	formItems: {
		paddingBottom: "1em"
	}
}))

const PasswordResetConfirmPage = (props) => {
	const classes = useStyles();
	const [pass1, setPass1] = useState("");
	const [pass2, setPass2] = useState("");
	const [alert, setAlert] = useState(false);

	const confirmReset = () => {
		if (pass1 !== pass2) {
			setAlert(true);
			return;
		}
		confirmPasswordReset(props.match.params.uid, props.match.params.token, {
			new_password1: pass1,
			new_password2: pass2,
			uid: props.match.params.uid,
			token: props.match.params.token,
		}, () => {
			// send user login
		}, (error) => {
			// check the error
			setAlert(true);
			console.log(error)
		})
	}

	return (<Grid container 
		className={classes.mainBox} 
		justifyContent="center" 
		alignItems="center" 
		direction='column'
		>
			<Typography className={classes.formItems} variant='h2'>Nova Password</Typography> 
			<TextField className={classes.formItems} variant="outlined" label="Nova password" type="password" onChange={(e) => setPass1(e.target.value)}/>
			<TextField className={classes.formItems} variant="outlined" label="Repita a nova password" type="password" onChange={(e) => setPass2(e.target.value)}/>
			<Button className={classes.formItems} onClick={confirmReset}>Mudar Password</Button>
			{alert && 
			<Collapse className={classes.formItems} in={alert}>
				<Alert 
					severity="error" 
					action={
						<IconButton
						aria-label="close"
						color="inherit"
						size="small"
						onClick={() => {
							setAlert(false);
						}}
						>
						<CloseIcon fontSize="inherit" />
						</IconButton>}
				>
					Passwords não são iguais — <strong>Verifica novamente!</strong>
				</Alert>
			</Collapse>
			}
		</Grid>)
}

export default PasswordResetConfirmPage
