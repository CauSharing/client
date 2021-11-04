import React from "react";
import { useHistory } from "react-router-dom";
import PinkBack from "../icons/pink-back.png";
import "./BackBtn.css";

function BackBtn({isGoBack, setShowContents}){
    const history = useHistory();
    const handleClick = (e) => {
        if(isGoBack)
            history.goBack();
        else
        {
            setShowContents(false);
        }
    }

    return(
        <button className="backBtn" onClick={handleClick}>
            {"<"}
        </button>
    );
}

export default BackBtn;