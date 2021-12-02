import React from "react";
import Info from './Info';

import Puang from "../../icons/푸앙_미소.png";
import {Box, Grid } from '@mui/material';

import './HomeTabPanel.css';

function HomeTabPanel({value, index}){
    return(
        <div
            role="tabpanel"
            hidden={value !== index}
        >
        {value === index && (
            <Box sx={{display: "flex", width:"100%", height: "100%", alignItems: "end"}}>
              <Box sx={{width:"60%", height: "100%"}}>
                <Info />
              </Box>
              <Box 
                sx={{
                  width: "40%", 
                  height: "100%", 
                  display:"flex", 
                  justifyContent: "center", 
                  alignItems:"end"}}>
                <img src={Puang} className="homeTabPanel__img"/>
              </Box>
            </Box>

        )}
      </div>
    );
}

export default HomeTabPanel;