import React, {useEffect} from "react";
import { Link ,useParams, useLocation} from 'react-router-dom';
import GroupSidebar from "../components/GroupSidebar";
import "./Diary.css";
import Calendar from "../components/Calendar";

function Diary({}){
    console.log("render diary");
    const {groupIdx} = useParams();

    return(
        <>
            <GroupSidebar diaryIdx={groupIdx}/>
            <Calendar />
        </>

    );
}

export default Diary;