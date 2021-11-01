import React from "react";
import PinkPlus from "../icons/pink-plus.png";
import "./PlusBtn.css";

function PlusBtn({setShowContents}){
    const handleClick = (e) => {
        e.preventDefault();
        setShowContents(true);
    }
    return(
        <button className="plusBtn" onClick={handleClick}>
            <img src={PinkPlus}/>
        </button>
    );
}

export default PlusBtn;