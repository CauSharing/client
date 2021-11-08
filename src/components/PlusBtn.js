import React from "react";
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const ColorButton = styled(Button)({
    width: '126px',
    height: '41px',
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: '18px',
    padding: '10px',
    lineHeight: 1.5,
    color: 'white',
    backgroundColor: '#3181C6',
    borderColor: '#0063cc',
    fontFamily: 'Roboto Condensed',
    marginTop: '20px',
    '&:hover': {
      backgroundColor: '#4892d2',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#4892d2',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  });

function PlusBtn({setShowContents, desc}){
    const handleClick = (e) => {
        e.preventDefault();
        setShowContents(true);
    }
    return(
        <ColorButton className="plusBtn" onClick={handleClick}>
            {desc}
        </ColorButton>
    );
}

export default PlusBtn;