import React from 'react';
import {Box, Avatar, Typography, Button} from '@mui/material';
import { styled } from '@mui/material/styles';

const TranslateButton= styled(Button)({
    color: "white",
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: '16px',
    padding: '5px',
    lineHeight: 1.5,
    backgroundColor: '#6CA6D9',
    fontFamily: [
      'Roboto Condensed'
    ].join(','),
    '&:hover': {
      backgroundColor: '#3181C6',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#3181C6',
    }
  });

function Message({user, content, isUserSent }){
    return (
        <Box sx={{display: "flex", width: "100%", justifyContent: isUserSent? "end" : "start", marginBottom: "15px"}}>
            <Box sx={{display:"flex", flexDirection: "column", alignItems: "center", marginRight:"5px"}}>
                <Avatar alt={user? user.nickname: "undefined"} src={user? user.image: null} size="small"/>
                <Typography variant="body1">{user.nickname}</Typography>
            </Box>
            <Box sx={{height: "100%"}}>
                <Typography variant="body1" sx={{backgroundColor: "secondary.light", display: "flex", alignItems: "center", padding: "10px", borderRadius: "5px", marginBottom: "5px"}}>
                    {content}
                </Typography>
                <Box sx={{display: "flex", justifyContent: isUserSent? "end" : "start"}}>
                    <TranslateButton>Translate</TranslateButton>
                </Box>
            </Box>
        </Box>
    );
}

export default Message;