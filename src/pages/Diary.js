import React, {useEffect} from "react";
import { Link ,useParams, useLocation} from 'react-router-dom';
import GroupSidebar from "../components/GroupSidebar";
import "./Diary.css";
import Calendar from "../components/Calendar";

function Diary({}){
    console.log("render diary");
    const {diaryIdx} = useParams();

    return(
        <>
            <GroupSidebar diaryIdx={diaryIdx}/>
            <Calendar />
        </>

    );
}

export default Diary;