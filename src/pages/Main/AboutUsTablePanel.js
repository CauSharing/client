import React from "react";
import {Box, Typography,Avatar } from '@mui/material';

import Puang from "../../icons/푸앙_사랑.png";

function AboutUsTablePanel({value, index}){
    return(
        <div
            role="tabpanel"
            hidden={value !== index}

            style={{height:"80%"}}
        >
        {value === index && (
          <Box sx={{display: "flex", width:"100%", height: "100%", alignItems: "end"}}>
            <Box sx={{width:"60%", height: "100%",display: "flex", padding: "20px", flexDirection:"column"}}>
            <Typography variant="h4" sx={{marginBottom:"40px"}}>About us</Typography>
            <Typography variant="h5" sx={{marginBottom:"10px"}}>Our goal</Typography>
            <Typography variant="body1" color="#646464" sx={{marginBottom:"40px"}}>
              We have seen many CAU students who don't talk to students from other countries.<br/>
              We think this is because we didn't have a chance to talk with foreign students and we are just afraid of speaking foreign languages.<br/>
              That's why we made 'CxC'!
              We want CAU students to join this cool website and make global friends.<br/>
            </Typography>
            <Typography variant="h5" sx={{marginBottom:"20px"}}>Team information</Typography>
            <Box sx={{display:"flex"}}>
              <Box sx={{margin: "0px 20px", display: "flex"}}>
                <Avatar sx={{width: 100, height: 100, marginRight:"10px"}}>

                </Avatar>
                <Box sx={{display:"flex", flexDirection:"column"}}>
                  <Typography variant="subtitle1">Kang minju</Typography>
                  <Typography variant="subtitle2">Frontend</Typography>
                </Box>
              </Box>
              <Box sx={{margin: "0px 20px", display: "flex"}}>
                <Avatar sx={{width: 100, height: 100, marginRight:"10px"}}>

                </Avatar>
                <Box sx={{display:"flex", flexDirection:"column"}}>
                  <Typography variant="subtitle1">Jeong jikwang</Typography>
                  <Typography variant="subtitle2">Backend</Typography>
                </Box>
              </Box>
              <Box sx={{margin: "0px 20px", display: "flex"}}>
                <Avatar sx={{width: 100, height: 100, marginRight:"10px"}}>

                </Avatar>
                <Box sx={{display:"flex", flexDirection:"column"}}>
                  <Typography variant="subtitle1">Jo nakyoung</Typography>
                  <Typography variant="subtitle2">Backend</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box sx={{width:"40%", height: "100%", display:"flex", justifyContent: "center", alignItems:"end"}}>
            <img src={Puang} style={{  width: "60%", height:"60%"}}/>
          </Box>
          </Box>
        )}
      </div>
    );
}

export default AboutUsTablePanel;