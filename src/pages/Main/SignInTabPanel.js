import React from 'react';
import {ButtonGroup , Button, Box} from '@mui/material';

import LogIn from './LogIn';

function SignInTabPanel({value, index}){
    return(
        <div
            role="tabpanel"
            hidden={value !== index}
        >
        {value === index && (
            <Box sx={{width: "100vw", display:"flex", height:"80vh"}}>
                <Box sx={{width:"50%"}}></Box>
                <LogIn />
            </Box>
        )}
      </div>
    );
}

export default SignInTabPanel;