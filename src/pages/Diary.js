import React, {useState} from "react";
import { Link } from 'react-router-dom';
import SideBar from "../components/SideBar";

function Diary({match}){
    console.log("render diary");
    console.log(match);
    return(
        <h1>Diary {match.params.diaryIdx}</h1>
    );
}

export default Diary;