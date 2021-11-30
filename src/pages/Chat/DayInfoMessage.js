import React , {useState} from 'react';
import {Box, Avatar, Typography, Button} from '@mui/material';
import { styled } from '@mui/material/styles';
import moment from 'moment';


function DayInfoMessage({year, month, date}){
    let dateObj = new Date(year, month-1, date) ;

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
            {moment(dateObj).format("dddd, MMMM Do YYYY")}
        </Box>

    )
  }
  
  export default DayInfoMessage;