import React from "react";
import { useHistory } from "react-router-dom";
import PinkBack from "../icons/pink-back.png";
import "./BackBtn.css";

function BackBtn(){
    const history = useHistory();
    const handleClick = (e) => {
        history.goBack();
    }

    return(
        <button className="backBtn" onClick={handleClick}>
            <img src={PinkBack} />
        </button>
    );
}

export default BackBtn;