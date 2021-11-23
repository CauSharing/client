import React, {useState, useEffect} from "react";
import { Link ,useParams, withRouter} from 'react-router-dom';
import GroupSidebar from "../../components/GroupSidebar";
import "./Diary.css";
import Calendar from "../../components/Calendar";
import BackBtn from "../../components/BackBtn";

import {Box} from "@mui/material";

function Diary({location}){
    const [groupName, setGroupName] = useState(null);
    const [groupImg, setGroupImg] = useState(null);
    const [groupUserList, setGroupUserList] = useState([]);
    const {groupIdx} = useParams();

    useEffect(() => {
        setGroupName(location.state.groupName);
        setGroupImg(location.state.groupImg);
        setGroupUserList(location.state.groupUserList);
    }, []);

    return(
        <Box sx={{display:"flex"}}>
            <GroupSidebar groupIdx={groupIdx} groupName={groupName} groupImg={groupImg} groupUserList={groupUserList}/>
            <Box sx={{padding: "20px", width: "100%"}}>
                <BackBtn nextLoc={"/home"}/>
                <Calendar />
            </Box>
        </Box>

    );
}

export default withRouter(Diary);