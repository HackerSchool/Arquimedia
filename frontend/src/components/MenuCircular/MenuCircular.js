import { Planet } from 'react-planet';
import React from "react";
import { useEffect, useState } from "react";
import { Avatar , IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import SchoolIcon from '@material-ui/icons/School';
import PersonIcon from '@material-ui/icons/Person';
import AssessmentIcon from '@material-ui/icons/Assessment';


const useStyles = makeStyles(theme => ({
    avatar: {
        width: "50px",
        height: "50px"
    },}))

const MenuCircular = (props) => {
	
    const classes = useStyles();
	

	return (
		<Planet
		centerContent={

		<div
				style={{
					height: 50,
					width: 50,
					borderRadius: '50%',
					backgroundColor: '#1da8a4',
				}}
			>
			<Avatar className={classes.avatar}>{props.userLetter}</Avatar></div>
		}
		hideOrbit
		autoClose
		orbitRadius={100}
		bounceOnClose
		tension={600}
		friction={25}
	>    
		<IconButton href="/achievements" text="Achievments"><div
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
	
		<IconButton href="/exames" text="Exames"><div 
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

		<IconButton href="/perfil" text="Exames"><div
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
	</Planet>
	);	
};

export default MenuCircular;