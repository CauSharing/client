import React , {useState} from 'react';
import {Box, Avatar, Typography, Button} from '@mui/material';
import { styled } from '@mui/material/styles';
import moment from 'moment';


function DayInfoMessage({time}){
    return(
        <Box sx={{
            width: "100%", 
            display:"flex", 
            justifyContent: "center", 
            alignItems:"center", 
            borderRadius:"5px", 
            fontSize:"14px", 
            color:"#7C7C7C",
            margin:"10px 0px"}}>
            {time}
        </Box>

    )
  }
  
  export default DayInfoMessage;