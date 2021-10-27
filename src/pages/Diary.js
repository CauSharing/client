import React, {useEffect} from "react";
import { Link ,useParams, useLocation} from 'react-router-dom';
import GroupSidebar from "../components/GroupSidebar";

function Diary({}){
    console.log("render diary");
    const {diaryIdx} = useParams();
    return(
        <>
            <GroupSidebar diaryIdx={diaryIdx}/>
        </>

    );
}

export default Diary;