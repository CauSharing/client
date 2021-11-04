import React from "react";
import PinkPlus from "../icons/pink-plus.png";
import "./PlusBtn.css";

function PlusBtn({setShowContents, desc}){
    const handleClick = (e) => {
        e.preventDefault();
        setShowContents(true);
    }
    return(
        <button className="plusBtn" onClick={handleClick}>
            {desc}
        </button>
    );
}

export default PlusBtn;