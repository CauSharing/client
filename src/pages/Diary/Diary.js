import React, {useState, useEffect, useContext} from "react";
import { Link ,useParams, withRouter, useLocation} from 'react-router-dom';
import GroupSidebar from "../../components/GroupSidebar";
import "./Diary.css";
import Calendar from "../../components/Calendar";
import BackBtn from "../../components/BackBtn";

import {Box} from "@mui/material";

import {GroupContext} from "../../context/index";

function Diary({}){
    const {state} = useContext(GroupContext);
    const [groupName, setGroupName] = useState(state.groupName);
    const [groupImg, setGroupImg] = useState(state.groupImg);
    const [groupUserList, setGroupUserList] = useState(state.groupUserList);
    const {groupIdx} = useParams();


    return(
        <Box sx={{display:"flex"}}>
            <GroupSidebar groupIdx={groupIdx} groupName={groupName} groupImg={groupImg} groupUserList={groupUserList}/>
            <Box sx={{padding: "20px", width: "100%"}}>
                <BackBtn nextLoc={"/home"}/>
                <Calendar groupName={groupName} groupImg={groupImg} groupUserList={groupUserList}/>
            </Box>
        </Box>

    );
}

export default withRouter(Diary);