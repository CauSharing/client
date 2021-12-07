import React from "react";
import { useHistory } from "react-router-dom";
import "./BackBtn.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function BackBtn({nextLoc, setShowContents}){
    const history = useHistory();
    const handleClick = (e) => {
       e.preventDefault();
        if(nextLoc)
            window.location.href = nextLoc;
        else
        {
            setShowContents(false);
        }
    }

    return(
        <button className={"backBtn" } onClick={handleClick}>
            <ArrowBackIcon />
        </button>
    );
}

export default BackBtn;