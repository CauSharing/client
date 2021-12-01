import React, {useState, useEffect, useContext} from "react";
import { Link ,useParams, withRouter, useLocation} from 'react-router-dom';
import GroupSidebar from "../../components/GroupSidebar";
import "./Diary.css";
import Calendar from "../../components/Calendar";
import BackBtn from "../../components/BackBtn";

import {Box} from "@mui/material";

function Diary({}){
    const {groupIdx} = useParams();
    const [groupName, setGroupName] = useState("");
    const [groupImg, setGroupImg] = useState("");
    const [groupUserList, setGroupUserList] = useState([]);

    useEffect(() => {
        var groupInfo = JSON.parse(localStorage.getItem('curGroup'));
        setGroupName(groupInfo.groupName);
        setGroupImg(groupInfo.groupImg);
        setGroupUserList(groupInfo.groupUserList);
    },[]);

    return(
        <Box sx={{display:"flex"}}>
            <GroupSidebar groupIdx={groupIdx}/>
            <Box sx={{padding: "20px", width: "100%"}}>
                <BackBtn nextLoc={"/home"}/>
                <Calendar groupName={groupName} groupImg={groupImg} groupUserList={groupUserList}/>
            </Box>
        </Box>

    );
}

export default withRouter(Diary);