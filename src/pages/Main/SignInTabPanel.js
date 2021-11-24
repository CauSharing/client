import React from 'react';
import {ButtonGroup , Button, Box} from '@mui/material';

import LogIn from './LogIn';

import PuangWorldMap from "../../icons/puang-world-map.png";
import './SignInTabPanel.css';

function SignInTabPanel({value, index}){
    return(
        <div
            role="tabpanel"
            hidden={value !== index}
        >
        {value === index && (
            <Box sx={{width: "100%", display:"flex", height:"85vh", alignItems:"center"}}>
                <Box sx={{width:"55%", display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <img src={PuangWorldMap} className="signInTabPanel__img"/>
                </Box>
                <Box sx={{width:"45%", display: "flex", alignItems:"center", justifyContent:"center"}}>
                    <LogIn />
                </Box>
            </Box>
        )}
      </div>
    );
}

export default SignInTabPanel;