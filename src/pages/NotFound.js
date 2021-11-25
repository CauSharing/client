import React from 'react';
import {Box, Typography} from '@mui/material';
// import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';

import SadPuangImg from '../icons/푸앙_절규.png';

function NotFound(){
    return(
        <Box sx={{height: "100vh", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column"}}>
            <Typography variant="h3" component="div">Not found!</Typography>
            {/* <DoNotDisturbAltIcon sx={{color:'#E02401', width: 40, height: 40, marginTop: 2}}/> */}
            <Box sx={{width: "20%", height: "20p%"}}>
                <img src={SadPuangImg} style={{width: "100%", height: "100%"}}/>
            </Box>
        </Box>
    );
}

export default NotFound;