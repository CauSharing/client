import React, {useEffect} from "react";
import { Link ,useParams, useLocation} from 'react-router-dom';
import GroupSidebar from "../../components/GroupSidebar";
import "./Diary.css";
import Calendar from "../../components/Calendar";
import BackBtn from "../../components/BackBtn";

import {Box} from "@mui/material";

function Diary({}){
    console.log("render diary");
    const {groupIdx} = useParams();

    return(
        <Box sx={{display:"flex"}}>
            <GroupSidebar diaryIdx={groupIdx}/>
            <Box sx={{padding: "20px", width: "100%"}}>
                <BackBtn nextLoc={"/home"}/>
                <Calendar />
            </Box>
        </Box>

    );
}

export default Diary;