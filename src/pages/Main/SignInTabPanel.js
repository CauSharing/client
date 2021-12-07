import React from 'react';
import {ButtonGroup , Button, Box} from '@mui/material';

import LogIn from './LogIn';

import PuangWorldMap from "../../icons/puang-world-map.png";
import './SignInTabPanel.css';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    notebook : {
        width:"55%", display:"flex", alignItems:"center", justifyContent:"center",
        [theme.breakpoints.down('sm')]:{
          display: "none",
        }
    }
  }));
  
const useFormStyles = makeStyles((theme) => ({
    notebook: {
        width:"45%", display: "flex", alignItems:"center", justifyContent:"center",
        [theme.breakpoints.down('sm')]:{
            width:"100%", display: "flex", alignItems:"center", justifyContent:"center",
        }
    }
}))

function SignInTabPanel({value, index}){
    const classes = useStyles();
    const formClasses =  useFormStyles();
    return(
        <div
            role="tabpanel"
            hidden={value !== index}
        >
        {value === index && (
            <Box sx={{width: "100%", display:"flex", height:"85vh", alignItems:"center"}}>
                <Box sx={{}} className={classes.notebook}>
                    <img src={PuangWorldMap} className="signInTabPanel__img"/>
                </Box>
                <Box className={formClasses.notebook}>
                    <LogIn />
                </Box>
            </Box>
        )}
      </div>
    );
}

export default SignInTabPanel;