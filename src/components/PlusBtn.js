import React from "react";
import PinkPlus from "../icons/pink-plus.png";
import "./PlusBtn.css";

function PlusBtn(){
    return(
        <button className="plusBtn">
            <img src={PinkPlus}/>
        </button>
    );
}

export default PlusBtn;