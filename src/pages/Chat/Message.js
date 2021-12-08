import React , {useState} from 'react';
import {Box, Avatar, Typography, Button, CircularProgress} from '@mui/material';
import { styled } from '@mui/material/styles';

import axios from 'axios';
import moment from 'moment';

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

function Message({nickname, image, content, isUserSent , srcLang, dstLang, time, isGrouped}){
  const [translatedContent, setTranslatedContent] = useState("");
  const [showOriginal, setShowOriginal] = useState(true);
  const [loading, setLoading]= useState(false);
  const img_reg = /.*\.(gif|jpe?g|bmp|png)$/igm;

  const handleTranslateButtonClick= async (e) => {
    // await e.preventDefault();
    await setLoading(true);

    const instance = axios.create({
      timeout: 30000,
    });
    await instance.get(`/api/translate?src=${srcLang}&dst=${dstLang}&content=${content}`)
      .then(res => {
          console.log(res);
          
          if(res.data.result){
            // console.log(JSON.parse(res.data.description));
            setTranslatedContent(JSON.parse(res.data.description).message.result.translatedText);
          }
          else{
              alert("error!");
          }
      })
      .catch(err =>{
          console.log(err);
      });
    
    await setLoading(false);
    await setShowOriginal(false);
    
  };

  const handleOriginalButtonClick = (e) => {
    e.preventDefault();
    setShowOriginal(true);
  }
    return (
        <Box sx={{width:"100%",display: "flex",  flexDirection: isUserSent? "row-reverse" : "row", marginBottom: "15px"}}>
          {
            isUserSent?
            null
            :
            <Box sx={{display:"flex", flexDirection: "column", alignItems: "center", margin:"0px 5px", visibility: isGrouped ? "hidden" : "visible"}}>
                <Avatar alt={nickname? nickname: "undefined"} src={img_reg.test(image)? image: null} size="small"/>
                <Typography variant="body1">{nickname}</Typography>
            </Box>
          }

             <Box sx={{maxWidth:"50%"}}>
               <Box sx={{display:"flex", flexDirection: isUserSent? "row-reverse" : "row"}}>
               {
                 loading ?
                  <Box sx={{backgroundColor: "secondary.light", display: "flex",justifyContent:"center", alignItems: "center", padding: "10px", borderRadius: "5px", marginBottom: "5px"}}>
                    <CircularProgress size="1.5rem" sx={{margin:"0px 5px"}}/>
                    <Typography variant="body1" color="primary">
                      Translating...
                    </Typography>
                  </Box>
                :
                <Typography variant="body1" sx={{backgroundColor: "secondary.light", display: "flex",justifyContent:"center", alignItems: "center", padding: "10px", borderRadius: "5px", marginBottom: "5px"}}>
                {
                  showOriginal?
                  content
                  :
                  translatedContent
                }   
                </Typography>             
               }
               {
                 isGrouped?
                 null
                 :
                 <Typography variant="body2" sx={{display:"flex", alignItems:"end", color:"#C0C0C0", margin:"0px 5px"}}>
                 {time}
                </Typography>
               }

              </Box>
              {
                isUserSent? 
                null
                :
                <Box sx={{display: "flex"}}>
                {
                  showOriginal?
                    <TranslateButton onClick={handleTranslateButtonClick}>Translate</TranslateButton>
                    :
                    <TranslateButton onClick={handleOriginalButtonClick}>See Original Text</TranslateButton>
                }
                  
              </Box> 
              }

            </Box> 
        </Box>
    );
}

export default Message;