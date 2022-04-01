import { Planet } from 'react-planet';
import React from "react";
import { IconButton } from '@mui/material'
import AvatarUser from '../avatar/AvatarUser';
import makeStyles from '@mui/styles/makeStyles';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { logOut } from '../../api';


const handleLogout = () => {
	//handleClose();
	logOut();
	window.location.replace("/");
}

const useStyles = makeStyles(theme => ({
    avatar: {
        width: 80,
        height: 80
    },}))

const MenuCircular = (props) => {
	
    const classes = useStyles();


	return (
        <div style={{marginTop: "-2.5rem"}}>
			<Planet
		centerContent={
			<div style={{
						borderRadius: '50%',
						backgroundColor: '#1da8a4',
					}}
			>	
				<AvatarUser className={classes.avatar} user={props.user} />
			
			</div>
			
		}
		autoClose
		hideOrbit
		orbitRadius={90}
		tension={600}
		friction={25}
	>    


		<IconButton href="" title="Logout" onClick={handleLogout} size="large"><div
			style={{
				height: 40,
				width: 40,
				borderRadius: '50%',
				backgroundColor: '#EB5757',
				color:'#FFFFFF',
				display: 'flex',
				alignItems: 'center',
			}}>
			<span style={{color:'#EB5757'}}>-</span><ExitToAppIcon/>
		</div></IconButton> 

		<div /> 

		<IconButton href="/leaderboards" title="Leaderboards" size="large"><div
			style={{
				height: 40,
				width: 40,
				borderRadius: '50%',
				backgroundColor: '#EB5757',
				display: 'flex',
				alignItems: 'center',
				
			}}>
			<span style={{color:'#EB5757'}}>-</span><AssessmentIcon style={{fill: "white"}}/>
		</div></IconButton>

		<div /> 
	
		<IconButton href="/exames" title="Realizar Exames" size="large"><div 
			style={{
				height: 40,
				width: 40,
				borderRadius: '50%',
				backgroundColor: '#EB5757',
				color:'#FFFFFF',
				display: 'flex',
				alignItems: 'center',
			}}>
			<span style={{color:'#EB5757'}}>-</span><SchoolIcon/>
		</div></IconButton>

		<div /> 

		<IconButton href="/perfil" title="Perfil" size="large"><div
			style={{
				height: 40,
				width: 40,
				borderRadius: '50%',
				backgroundColor: '#EB5757',
				color:'#FFFFFF',
				display: 'flex',
				alignItems: 'center',
			}}>
			<span style={{color:'#EB5757'}}>-</span><PersonIcon/>
		</div></IconButton>  
		 
		<div /> 
		<div /> 
		<div />
		<div /> 
		<div /> 
		<div /> 
		<div />
		<div /> 
		<div /> 
		<div /> 
		<div />
		<div /> 
		<div /> 
		<div /> 
		<div />
		<div /> 
		
	</Planet>
		</div>
    );	
};

export default MenuCircular;