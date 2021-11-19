import React, {useState} from "react";
import {Box, Tabs, Tab} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTabs = styled((props) => (
    <Tabs
      {...props}
      TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
  ))({
    '& .MuiTabs-indicator': {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
      maxWidth: '300px',
      width: '100%',
      backgroundColor: '#0148A0',
    },
  });
  
  const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
      textTransform: 'none',
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(20),
      marginRight: theme.spacing(1),
      color: '#7C7C7C',
      '&.Mui-selected': {
        color: '#000000',
      },
      '&.Mui-focusVisible': {
        backgroundColor: 'rgba(49, 129, 198, 0.25)',
      },
    }),
  );

function Menu({value, handleChange}){


    return(
        <Box sx={{width: '100vw', display: "flex", alignItems:"center", justifyContent:"space-between",
        paddingRight:"30px", paddingTop:"10px"}}>
            <div className="main__title">
                CxC
            </div>
            <StyledTabs 
                value={value} 
                onChange={handleChange}
                sx={{font: "bold"}}>
                <StyledTab label="Home" value='1'></StyledTab>
                <StyledTab label="About us" value='2'></StyledTab>
                <StyledTab label="Sign in/up" value='3'></StyledTab>
            </StyledTabs>
        </Box>
    );
}

export default Menu;